# 🎬 Script Cortar Vídeos

Ferramenta para extrair frames de vídeos e gerar variações rotacionadas, pensada para montar datasets de treinamento de modelos de visão computacional. O mesmo processo existe em duas versões: um script Python de linha de comando (usando OpenCV) e uma página HTML que roda tudo no navegador, sem precisar instalar nada.

## 📂 Arquivos
| Arquivo | Descrição |
|---|---|
| `dataset_builder.py` | Script Python (OpenCV) que extrai frames de vídeos e aplica rotações configuráveis, salvando as imagens organizadas em uma pasta por vídeo |
| `index.html` | Versão web do mesmo processo — arraste vídeos, ajuste ângulos, formato e qualidade, e baixe o dataset gerado em `.zip` (usa `JSZip`, tudo processado localmente no navegador) |

---
**Autor:** Manoel Teles · [LinkedIn](https://www.linkedin.com/in/manoeltelesps)
