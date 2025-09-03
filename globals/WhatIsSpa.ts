import type { GlobalConfig } from 'payload'

const WhatIsSpaGlobal: GlobalConfig = {
    slug: 'whatIsSpa',
    label: 'Home - ¿Qué es un Spa?',
    access: { read: () => true, update: () => true },
    fields: [
        {
            type: 'group',
            name: 'title',
            label: 'Título',
            fields: [
                { name: 'left', label: 'Parte 1', type: 'text', required: true, defaultValue: '¿Qué es un' },
                { name: 'yellow', label: 'Resalte Amarillo', type: 'text', required: true, defaultValue: 'Spa' },
                { name: 'between', label: 'Conector', type: 'text', required: true, defaultValue: 'para' },
                { name: 'pink', label: 'Resalte Rosado', type: 'text', required: true, defaultValue: 'Perros y Gatos' },
            ],
        },
        {
            name: 'content',
            label: 'Contenido (WYSIWYG)',
            type: 'richText',
            required: false,
            defaultValue: {
                root: {
                    type: 'root', format: '', indent: 0, version: 1, direction: 'ltr',
                    children: [
                        {
                            type: 'paragraph', format: '', indent: 0, version: 1, direction: 'ltr', children: [
                                { type: 'text', text: 'Un spa para mascotas es mucho más que un simple baño. Es una experiencia integral de bienestar que combina técnicas profesionales de grooming con tratamientos relajantes y terapéuticos, diseñados específicamente para el cuidado y la salud de perros y gatos.', detail: 0, format: 0, mode: 'normal', style: '', version: 1 }
                            ]
                        },
                        {
                            type: 'paragraph', format: '', indent: 0, version: 1, direction: 'ltr', children: [
                                { type: 'text', text: 'En SANROQUE, transformamos el cuidado tradicional en una experiencia premium que no solo mejora la apariencia de tu mascota, sino que también contribuye a su salud física y bienestar emocional.', detail: 0, format: 0, mode: 'normal', style: '', version: 1 }
                            ]
                        },
                    ]
                }
            }
        },
        {
            name: 'benefits',
            label: 'Beneficios',
            type: 'array',
            minRows: 1,
            fields: [
                { name: 'title', type: 'text', required: true, label: 'Título' },
                { name: 'description', type: 'text', required: true, label: 'Descripción' },
                {
                    name: 'icon',
                    type: 'select',
                    label: 'Ícono',
                    required: true,
                    defaultValue: 'shield',
                    options: [
                        { label: 'Shield', value: 'shield' },
                        { label: 'Sparkles', value: 'sparkles' },
                        { label: 'Heart', value: 'heart' },
                        { label: 'Home', value: 'home' },
                    ],
                },
                { name: 'isSpecial', type: 'checkbox', label: 'Destacar', defaultValue: false },
            ],
            defaultValue: [
                { title: 'Evaluación Completa', description: 'Revisión detallada del estado de salud y bienestar.', icon: 'shield', isSpecial: false },
                { title: 'Productos Premium', description: 'Iv San Bernard e Hydra para resultados excepcionales.', icon: 'sparkles', isSpecial: false },
                { title: 'Cuidado Personalizado', description: 'Tratamientos adaptados a cada mascota.', icon: 'heart', isSpecial: false },
                { title: 'Ambiente Libre de Jaulas', description: 'Experiencia relajante sin jaulas.', icon: 'home', isSpecial: true },
            ],
        },
        {
            type: 'group',
            name: 'images',
            label: 'Imágenes',
            fields: [
                { name: 'main', label: 'Imagen principal', type: 'upload', relationTo: 'media' },
                { name: 'secondary', label: 'Imagen secundaria', type: 'upload', relationTo: 'media' },
            ],
        },
    ],
}

export default WhatIsSpaGlobal
