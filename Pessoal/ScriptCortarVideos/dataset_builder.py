#!/usr/bin/env python3
"""
dataset_builder.py
Extrai frames de vídeos e aplica rotações para criar datasets de treinamento.
Uso: python dataset_builder.py [opções] video1.mp4 video2.mp4 ...
"""

import cv2
import os
import sys
import argparse
import math
from pathlib import Path


def parse_args():
    parser = argparse.ArgumentParser(
        description="Extrai frames de vídeos e gera rotações para dataset de ML.",
        formatter_class=argparse.RawTextHelpFormatter,
        epilog="""
Exemplos:
  python dataset_builder.py video.mp4
  python dataset_builder.py *.mp4 --output dataset/ --frames 200
  python dataset_builder.py video.mp4 --angles 0 45 90 135 180 225 270 315
  python dataset_builder.py video.mp4 --fps 5 --no-original
        """
    )

    parser.add_argument(
        "videos",
        nargs="+",
        help="Arquivo(s) de vídeo para processar"
    )
    parser.add_argument(
        "--output", "-o",
        default="dataset",
        help="Pasta de saída para os frames (padrão: dataset/)"
    )
    parser.add_argument(
        "--frames", "-f",
        type=int,
        default=None,
        help="Número máximo de frames a extrair por vídeo (padrão: automático baseado na duração)"
    )
    parser.add_argument(
        "--fps",
        type=float,
        default=None,
        help="Extrair frames a cada N segundos (ex: 2 = 1 frame a cada 2s). Sobrescreve --frames"
    )
    parser.add_argument(
        "--angles", "-a",
        type=float,
        nargs="+",
        default=[0, 45, 90, 135, 180, 225, 270, 315],
        help="Ângulos de rotação em graus (padrão: 0 45 90 135 180 225 270 315)"
    )
    parser.add_argument(
        "--no-original",
        action="store_true",
        help="Não salvar os frames originais sem rotação (ângulo 0)"
    )
    parser.add_argument(
        "--crop",
        action="store_true",
        help="Recortar as bordas pretas após rotação (mantém dimensões originais)"
    )
    parser.add_argument(
        "--format",
        choices=["jpg", "png"],
        default="jpg",
        help="Formato das imagens de saída (padrão: jpg)"
    )
    parser.add_argument(
        "--quality",
        type=int,
        default=95,
        help="Qualidade JPEG de 1-100 (padrão: 95, ignorado para PNG)"
    )
    parser.add_argument(
        "--prefix",
        default="",
        help="Prefixo para os nomes dos arquivos gerados"
    )

    return parser.parse_args()


def get_video_info(cap):
    total_frames = int(cap.get(cv2.CAP_PROP_FRAME_COUNT))
    fps = cap.get(cv2.CAP_PROP_FPS)
    duration = total_frames / fps if fps > 0 else 0
    width = int(cap.get(cv2.CAP_PROP_FRAME_WIDTH))
    height = int(cap.get(cv2.CAP_PROP_FRAME_HEIGHT))
    return total_frames, fps, duration, width, height


def calculate_frame_indices(total_frames, fps, duration, target_frames=None, interval_seconds=None):
    """Calcula quais índices de frames extrair."""
    if interval_seconds:
        step = max(1, int(fps * interval_seconds))
        indices = list(range(0, total_frames, step))
    elif target_frames:
        if target_frames >= total_frames:
            indices = list(range(total_frames))
        else:
            step = total_frames / target_frames
            indices = [int(i * step) for i in range(target_frames)]
    else:
        # Automático: ~1 frame a cada 2 segundos, mínimo 10, máximo 300
        auto_interval = max(1, int(fps * 2))
        indices = list(range(0, total_frames, auto_interval))
        indices = indices[:300]  # cap de segurança

    return indices


def rotate_image(image, angle, crop=False):
    """Rotaciona imagem e opcionalmente recorta bordas pretas."""
    if angle == 0:
        return image

    h, w = image.shape[:2]
    cx, cy = w // 2, h // 2

    M = cv2.getRotationMatrix2D((cx, cy), -angle, 1.0)

    if crop:
        # Calcular novo tamanho para evitar corte do conteúdo
        angle_rad = math.radians(abs(angle))
        new_w = int(h * abs(math.sin(angle_rad)) + w * abs(math.cos(angle_rad)))
        new_h = int(h * abs(math.cos(angle_rad)) + w * abs(math.sin(angle_rad)))

        M[0, 2] += (new_w - w) / 2
        M[1, 2] += (new_h - h) / 2

        rotated = cv2.warpAffine(image, M, (new_w, new_h))
        # Redimensionar de volta para dimensões originais
        rotated = cv2.resize(rotated, (w, h))
    else:
        rotated = cv2.warpAffine(image, M, (w, h))

    return rotated


def process_video(video_path, output_dir, args):
    """Processa um vídeo: extrai frames e gera rotações."""
    video_name = Path(video_path).stem
    cap = cv2.VideoCapture(video_path)

    if not cap.isOpened():
        print(f"  ❌ Não foi possível abrir: {video_path}")
        return 0

    total_frames, fps, duration, width, height = get_video_info(cap)

    print(f"\n📹 {Path(video_path).name}")
    print(f"   Resolução: {width}x{height} | FPS: {fps:.1f} | Duração: {duration:.1f}s | Frames: {total_frames}")

    indices = calculate_frame_indices(
        total_frames, fps, duration,
        target_frames=args.frames,
        interval_seconds=args.fps
    )

    angles = args.angles
    if args.no_original and 0 in angles:
        angles = [a for a in angles if a != 0]

    total_images = len(indices) * len(angles)
    print(f"   Frames a extrair: {len(indices)} | Ângulos: {angles} | Total de imagens: {total_images}")

    # Pasta por vídeo dentro do output
    video_out_dir = output_dir / video_name
    video_out_dir.mkdir(parents=True, exist_ok=True)

    save_params = []
    if args.format == "jpg":
        save_params = [cv2.IMWRITE_JPEG_QUALITY, args.quality]

    saved = 0
    for frame_num, frame_idx in enumerate(indices):
        cap.set(cv2.CAP_PROP_POS_FRAMES, frame_idx)
        ret, frame = cap.read()

        if not ret:
            continue

        for angle in angles:
            rotated = rotate_image(frame, angle, crop=args.crop)

            prefix = f"{args.prefix}_" if args.prefix else ""
            angle_str = f"{int(angle):03d}"
            filename = f"{prefix}{video_name}_frame{frame_num:04d}_rot{angle_str}.{args.format}"
            filepath = video_out_dir / filename

            cv2.imwrite(str(filepath), rotated, save_params)
            saved += 1

        # Progress a cada 10 frames
        if (frame_num + 1) % 10 == 0 or frame_num == len(indices) - 1:
            pct = (frame_num + 1) / len(indices) * 100
            bar = "█" * int(pct / 5) + "░" * (20 - int(pct / 5))
            print(f"   [{bar}] {pct:.0f}% ({frame_num + 1}/{len(indices)} frames)", end="\r")

    print(f"   [{('█' * 20)}] 100% ({len(indices)}/{len(indices)} frames)")
    cap.release()

    return saved


def main():
    args = parse_args()
    output_dir = Path(args.output)
    output_dir.mkdir(parents=True, exist_ok=True)

    print("=" * 60)
    print("  Dataset Builder — Extração de Frames + Rotações")
    print("=" * 60)
    print(f"  Saída:    {output_dir.resolve()}")
    print(f"  Ângulos:  {args.angles}")
    print(f"  Formato:  {args.format.upper()}")
    print("=" * 60)

    total_saved = 0
    valid_videos = []

    for video_path in args.videos:
        if not os.path.exists(video_path):
            print(f"\n⚠️  Arquivo não encontrado: {video_path}")
            continue
        valid_videos.append(video_path)

    if not valid_videos:
        print("\n❌ Nenhum vídeo válido encontrado.")
        sys.exit(1)

    for video_path in valid_videos:
        saved = process_video(video_path, output_dir, args)
        total_saved += saved
        print(f"   ✅ {saved} imagens salvas")

    print("\n" + "=" * 60)
    print(f"  ✅ Concluído! Total de imagens geradas: {total_saved}")
    print(f"  📁 Dataset salvo em: {output_dir.resolve()}")
    print("=" * 60)


if __name__ == "__main__":
    main()
