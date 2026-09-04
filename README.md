# Drill Price Calculator

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
- Distância da deslocação (km) — taxa fixa de 0.16€/km (8L/100km a 2€/L)
- IVA (%)
- Margem de lucro (slider, 0–100%)
