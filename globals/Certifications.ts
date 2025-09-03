import type { GlobalConfig } from 'payload'

const CertificationsGlobal: GlobalConfig = {
    slug: 'certifications',
    label: 'Home - Certificaciones',
    access: { read: () => true, update: () => true },
    fields: [
        {
            type: 'group',
            name: 'title',
            label: 'Título',
            fields: [
                { name: 'left', label: 'Parte 1', type: 'text', required: true, defaultValue: 'Nuestras' },
                { name: 'yellow', label: 'Resalte Amarillo', type: 'text', required: true, defaultValue: 'Certificaciones' },
            ],
        },
        {
            name: 'badge',
            label: 'Insignia',
            type: 'text',
            required: false,
            defaultValue: 'Certificaciones de Excelencia',
        },
        {
            name: 'intro',
            label: 'Introducción (WYSIWYG)',
            type: 'richText',
            required: false,
            defaultValue: {
                root: {
                    type: 'root',
                    format: '',
                    indent: 0,
                    version: 1,
                    direction: 'ltr',
                    children: [
                        {
                            type: 'paragraph',
                            format: '',
                            indent: 0,
                            version: 1,
                            direction: 'ltr',
                            children: [
                                {
                                    type: 'text',
                                    text:
                                        'Respaldados por las certificaciones más prestigiosas de la industria pet, garantizamos el más alto nivel de calidad y bienestar para tu mascota.',
                                    detail: 0,
                                    format: 0,
                                    mode: 'normal',
                                    style: '',
                                    version: 1,
                                },
                            ],
                        },
                    ],
                },
            },
        },
        {
            name: 'certifications',
            label: 'Certificaciones',
            type: 'array',
            minRows: 1,
            fields: [
                { name: 'title', label: 'Título', type: 'text', required: true },
                { name: 'subtitle', label: 'Subtítulo', type: 'text', required: false },
                { name: 'description', label: 'Descripción (WYSIWYG)', type: 'richText', required: false },
                { name: 'color', label: 'Gradiente Tailwind', type: 'text', required: false, defaultValue: 'from-yellow-400 to-amber-500' },
                {
                    name: 'icon',
                    label: 'Ícono',
                    type: 'select',
                    required: true,
                    defaultValue: 'award',
                    options: [
                        { label: 'Award', value: 'award' },
                        { label: 'Shield', value: 'shield' },
                        { label: 'Star', value: 'star' },
                        { label: 'CheckCircle', value: 'checkCircle' },
                    ],
                },
                { name: 'link', label: 'Enlace (opcional)', type: 'text', required: false },
                { name: 'logo', label: 'Logo', type: 'upload', relationTo: 'media', required: false },
            ],
            defaultValue: [
                {
                    title: '6° Premios PetIndustry 2025',
                    subtitle: 'Mejor Spa y Peluquería en Bogotá',
                    description: {
                        root: {
                            type: 'root',
                            format: '',
                            indent: 0,
                            version: 1,
                            direction: 'ltr',
                            children: [
                                {
                                    type: 'paragraph',
                                    format: '',
                                    indent: 0,
                                    version: 1,
                                    direction: 'ltr',
                                    children: [
                                        {
                                            type: 'text',
                                            text: 'Reconocimiento a la excelencia en servicios de grooming y bienestar para mascotas',
                                            detail: 0,
                                            format: 0,
                                            mode: 'normal',
                                            style: '',
                                            version: 1,
                                        },
                                    ],
                                },
                            ],
                        },
                    },
                    color: 'from-yellow-400 to-amber-500',
                    icon: 'award',
                    logo: null,
                },
                {
                    title: 'Fear Free Certified',
                    subtitle: 'Certificación en Bienestar Animal',
                    description: {
                        root: {
                            type: 'root',
                            format: '',
                            indent: 0,
                            version: 1,
                            direction: 'ltr',
                            children: [
                                {
                                    type: 'paragraph',
                                    format: '',
                                    indent: 0,
                                    version: 1,
                                    direction: 'ltr',
                                    children: [
                                        {
                                            type: 'text',
                                            text: 'Técnicas especializadas para reducir el estrés y la ansiedad en las mascotas',
                                            detail: 0,
                                            format: 0,
                                            mode: 'normal',
                                            style: '',
                                            version: 1,
                                        },
                                    ],
                                },
                            ],
                        },
                    },
                    color: 'from-blue-400 to-cyan-500',
                    icon: 'shield',
                    logo: null,
                },
            ],
        },
        {
            name: 'achievements',
            label: 'Logros',
            type: 'array',
            fields: [{ name: 'text', type: 'text', required: true }],
            defaultValue: [
                { text: 'Técnicas libres de estrés certificadas' },
                { text: 'Personal especializado y capacitado' },
                { text: 'Ambiente 100% libre de jaulas' },
                { text: 'Productos premium certificados' },
            ],
        },
    ],
}

export default CertificationsGlobal
