import type { GlobalConfig } from 'payload'

const SpaExperienceGlobal: GlobalConfig = {
    slug: 'spaExperience',
    label: 'Home - Experiencia Spa 360',
    access: { read: () => true, update: () => true },
    fields: [
        {
            type: 'group',
            name: 'title',
            label: 'Título',
            fields: [
                { name: 'left', label: 'Parte 1', type: 'text', required: true, defaultValue: 'Experiencia' },
                { name: 'yellow', label: 'Resalte Amarillo', type: 'text', required: true, defaultValue: 'Spa 360°' },
            ],
        },
        {
            name: 'intro',
            label: 'Introducción (WYSIWYG)',
            type: 'richText',
            required: false,
            defaultValue: {
                root: {
                    type: 'root', format: '', indent: 0, version: 1, direction: 'ltr',
                    children: [
                        {
                            type: 'paragraph', format: '', indent: 0, version: 1, direction: 'ltr', children: [
                                { type: 'text', text: 'Un enfoque integral que combina bienestar, salud y belleza para tu mascota.', detail: 0, format: 0, mode: 'normal', style: '', version: 1 }
                            ]
                        }
                    ]
                }
            }
        },
        {
            name: 'video',
            label: 'Video',
            type: 'group',
            fields: [
                { name: 'url', label: 'URL de video (YouTube/Vimeo)', type: 'text' },
                { name: 'caption', label: 'Leyenda', type: 'text' },
            ]
        },
        {
            name: 'experiences',
            label: 'Experiencias',
            type: 'array',
            minRows: 1,
            fields: [
                { name: 'title', type: 'text', label: 'Título', required: true },
                { name: 'image', type: 'upload', relationTo: 'media', label: 'Imagen', required: false },
                { name: 'description', type: 'richText', label: 'Descripción (WYSIWYG)', required: false },
            ],
            defaultValue: [
                {
                    title: 'Baños Terapéuticos',
                    image: null,
                    description: { root: { type: 'root', format: '', indent: 0, version: 1, direction: 'ltr', children: [{ type: 'paragraph', format: '', indent: 0, version: 1, direction: 'ltr', children: [{ type: 'text', text: 'Experiencia relajante con productos premium', detail: 0, format: 0, mode: 'normal', style: '', version: 1 }] }] } },
                },
                {
                    title: 'Masajes Especializados',
                    image: null,
                    description: { root: { type: 'root', format: '', indent: 0, version: 1, direction: 'ltr', children: [{ type: 'paragraph', format: '', indent: 0, version: 1, direction: 'ltr', children: [{ type: 'text', text: 'Técnicas profesionales para el bienestar', detail: 0, format: 0, mode: 'normal', style: '', version: 1 }] }] } },
                },
                {
                    title: 'Ozonoterapia',
                    image: null,
                    description: { root: { type: 'root', format: '', indent: 0, version: 1, direction: 'ltr', children: [{ type: 'paragraph', format: '', indent: 0, version: 1, direction: 'ltr', children: [{ type: 'text', text: 'Tratamientos avanzados para la salud', detail: 0, format: 0, mode: 'normal', style: '', version: 1 }] }] } },
                },
                {
                    title: 'Ambiente Profesional',
                    image: null,
                    description: { root: { type: 'root', format: '', indent: 0, version: 1, direction: 'ltr', children: [{ type: 'paragraph', format: '', indent: 0, version: 1, direction: 'ltr', children: [{ type: 'text', text: 'Instalaciones de primera clase', detail: 0, format: 0, mode: 'normal', style: '', version: 1 }] }] } },
                },
            ],
        },
    ],
}

export default SpaExperienceGlobal
