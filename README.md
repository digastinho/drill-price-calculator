# Drill Price Calculator

## Como funciona

Cada furo é tratado como um cilindro:

\`\`\`
volume (cm³) = π × raio² × profundidade
\`\`\`

É possível adicionar vários furos com medidas diferentes (diâmetro, profundidade, quantidade) numa lista — o preço final soma o volume de todos.

O preço final soma:

1. Custo material = volume total de todos os furos × preço/cm³
2. Custo fixo total = custo fixo por furo × quantidade total de furos
3. Custo de deslocação = distância (km) × taxa fixa (0.16€/km, baseado em 8L/100km a 2€/L)
4. Margem de lucro (%, ajustável por slider)
5. IVA (%)

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
- Diâmetro (mm) — por furo adicionado
- Profundidade (mm) — por furo adicionado
- Quantidade — por furo adicionado
- Preço por cm³ (€)
- Custo fixo por furo — desgaste de broca (€)
- Distância da deslocação (km) — taxa fixa de 0.16€/km (8L/100km a 2€/L)
- IVA (%)
- Margem de lucro (slider, 0–100%)
