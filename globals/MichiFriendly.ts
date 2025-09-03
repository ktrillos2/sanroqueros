import type { GlobalConfig } from 'payload'

const MichiFriendlyGlobal: GlobalConfig = {
    slug: 'michiFriendly',
    label: 'Home - Michi Friendly',
    access: { read: () => true, update: () => true },
    fields: [
        {
            type: 'group',
            name: 'title',
            label: 'Título',
            fields: [
                { name: 'pink', label: 'Resalte Rosa', type: 'text', required: true, defaultValue: 'Michi' },
                { name: 'rest', label: 'Resto', type: 'text', required: true, defaultValue: 'Friendly' },
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
                                { type: 'text', text: 'Sabemos que los gatos son especiales. Por eso hemos creado un ambiente y servicios diseñados específicamente para el bienestar y comodidad de nuestros amigos felinos.', detail: 0, format: 0, mode: 'normal', style: '', version: 1 },
                            ],
                        },
                    ],
                },
            },
        },
        {
            name: 'features',
            label: 'Características',
            type: 'array',
            minRows: 1,
            fields: [
                {
                    name: 'icon',
                    label: 'Ícono',
                    type: 'select',
                    options: [
                        { label: 'Heart', value: 'heart' },
                        { label: 'Sparkles', value: 'sparkles' },
                        { label: 'Star', value: 'star' },
                    ],
                    defaultValue: 'heart',
                },
                { name: 'title', type: 'text', label: 'Título', required: true },
                { name: 'description', type: 'richText', label: 'Descripción (WYSIWYG)', required: false },
            ],
            defaultValue: [
                { icon: 'heart', title: 'Ambiente Tranquilo', description: { root: { type: 'root', format: '', indent: 0, version: 1, direction: 'ltr', children: [{ type: 'paragraph', format: '', indent: 0, version: 1, direction: 'ltr', children: [{ type: 'text', text: 'Espacios diseñados especialmente para el bienestar felino', detail: 0, format: 0, mode: 'normal', style: '', version: 1 }] }] } } },
                { icon: 'sparkles', title: 'Técnicas Especializadas', description: { root: { type: 'root', format: '', indent: 0, version: 1, direction: 'ltr', children: [{ type: 'paragraph', format: '', indent: 0, version: 1, direction: 'ltr', children: [{ type: 'text', text: 'Métodos suaves adaptados al comportamiento de los gatos', detail: 0, format: 0, mode: 'normal', style: '', version: 1 }] }] } } },
                { icon: 'star', title: 'Productos Específicos', description: { root: { type: 'root', format: '', indent: 0, version: 1, direction: 'ltr', children: [{ type: 'paragraph', format: '', indent: 0, version: 1, direction: 'ltr', children: [{ type: 'text', text: 'Líneas de cuidado formuladas exclusivamente para felinos', detail: 0, format: 0, mode: 'normal', style: '', version: 1 }] }] } } },
            ],
        },
        {
            name: 'video',
            label: 'Video',
            type: 'group',
            fields: [
                {
                    name: 'sourceType',
                    label: 'Fuente del video',
                    type: 'radio',
                    defaultValue: 'youtube',
                    options: [
                        { label: 'YouTube', value: 'youtube' },
                        { label: 'Archivo subido', value: 'upload' },
                    ],
                    admin: { layout: 'horizontal' },
                },
                {
                    name: 'youtubeUrl',
                    label: 'URL de YouTube',
                    type: 'text',
                    admin: {
                        condition: (data: any, siblingData: any) => siblingData?.sourceType === 'youtube',
                        description: 'Ej: https://www.youtube.com/watch?v=VIDEO_ID',
                    },
                },
                {
                    name: 'file',
                    label: 'Archivo de video',
                    type: 'upload',
                    relationTo: 'media',
                    admin: {
                        condition: (data: any, siblingData: any) => siblingData?.sourceType === 'upload',
                    },
                },
                { name: 'caption', label: 'Leyenda', type: 'text' },
            ],
        },
        {
            name: 'images',
            label: 'Imágenes',
            type: 'group',
            fields: [
                { name: 'main', label: 'Imagen principal', type: 'upload', relationTo: 'media' },
                { name: 'secondary', label: 'Imagen secundaria', type: 'upload', relationTo: 'media' },
            ],
        },
    ],
}

export default MichiFriendlyGlobal
