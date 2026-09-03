# Drill Price Calculator

🔗 **Demo:** [digastinho.github.io/drill-price-calculator](https://digastinho.github.io/drill-price-calculator/)

Calculadora de preço para furos, com base no volume perfurado (cilindro) e preço por cm³.

```
volume (cm³) = π × raio² × profundidade
```

O preço final soma:

1. Custo material = volume total × preço/cm³
2. Custo fixo total = custo fixo por furo × quantidade
3. Margem de lucro (%, ajustável por slider)
4. IVA (%)

## Executar

Abrir `index.html` num browser moderno. Não tem dependências.

## Estrutura

```text
drill-price-calculator/
├── index.html
├── css/
│   └── styles.css
└── js/
    └── script.js
```

## Inputs

- Nome do furo / projeto
- Diâmetro (mm)
- Profundidade (mm)
- Quantidade de furos
- Preço por cm³ (€)
- Custo fixo por furo — desgaste de broca (€)
- IVA (%)
- Margem de lucro (slider, 0–100%)
