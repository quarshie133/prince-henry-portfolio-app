import React, { useCallback } from 'react';
import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Image from '@tiptap/extension-image';
import Youtube from '@tiptap/extension-youtube';
import Link from '@tiptap/extension-link';
import TextAlign from '@tiptap/extension-text-align';
import {
    Bold, Italic, Strikethrough, Code,
    Heading1, Heading2, List, ListOrdered,
    Quote, Undo, Redo, AlignLeft, AlignCenter,
    AlignRight, AlignJustify, Link as LinkIcon,
    Image as ImageIcon, Youtube as YoutubeIcon,
    Music, Film
} from 'lucide-react';

interface EditorProps {
    content: string;
    onChange: (content: string) => void;
}

const MenuBar = ({ editor }: { editor: any }) => {
    if (!editor) {
        return null;
    }

    const imageInputRef = React.useRef<HTMLInputElement>(null);
    const audioInputRef = React.useRef<HTMLInputElement>(null);
    const videoInputRef = React.useRef<HTMLInputElement>(null);

    const [isUploading, setIsUploading] = React.useState(false);

    const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>, type: 'image' | 'audio' | 'video') => {
        const file = e.target.files?.[0];
        if (!file) return;

        setIsUploading(true);
        const formData = new FormData();
        formData.append('file', file);

        try {
            const res = await fetch('/api/upload', {
                method: 'POST',
                body: formData,
            });
            
            if (!res.ok) throw new Error('Upload failed');
            const data = await res.json();
            const url = data.url;

            if (type === 'image') {
                editor.chain().focus().setImage({ src: url }).run();
            } else if (type === 'audio') {
                editor.chain().focus().insertContent(`<p><audio controls src="${url}" class="w-full my-4"></audio></p>`).run();
            } else if (type === 'video') {
                editor.chain().focus().insertContent(`<p><video controls src="${url}" class="w-full my-4 rounded-xl shadow-sm border border-gray-100 dark:border-gray-800"></video></p>`).run();
            }
        } catch (error) {
            console.error('Failed to upload media:', error);
            alert('Failed to upload media. Please try again.');
        } finally {
            setIsUploading(false);
            if (e.target) e.target.value = ''; // Reset input
        }
    };

    const addYoutubeVideo = useCallback(() => {
        const url = window.prompt('URL of the YouTube video:');
        if (url) {
            editor.commands.setYoutubeVideo({
                src: url,
                width: Math.max(320, parseInt(window.prompt('Width (optional)', '640') || '640', 10)),
                height: Math.max(180, parseInt(window.prompt('Height (optional)', '480') || '480', 10)),
            });
        }
    }, [editor]);

    const setLink = useCallback(() => {
        const previousUrl = editor.getAttributes('link').href;
        const url = window.prompt('URL', previousUrl);

        if (url === null) return;
        if (url === '') {
            editor.chain().focus().extendMarkRange('link').unsetLink().run();
            return;
        }
        editor.chain().focus().extendMarkRange('link').setLink({ href: url }).run();
    }, [editor]);

    const Btn = ({ onClick, active, disabled, children }: any) => (
        <button
            type="button"
            onClick={onClick}
            disabled={disabled}
            className={`p-2 rounded-md transition-colors flex items-center justify-center ${active ? 'bg-black text-white dark:bg-white dark:text-black' : 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800'
                } ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`}
        >
            {children}
        </button>
    );

    return (
        <div className="flex flex-wrap items-center gap-1 p-2 bg-gray-50 dark:bg-[#111] border-b border-gray-200 dark:border-gray-800 rounded-t-xl sticky top-0 z-10">
            <Btn onClick={() => editor.chain().focus().toggleBold().run()} disabled={!editor.can().chain().focus().toggleBold().run()} active={editor.isActive('bold')}>
                <Bold size={16} />
            </Btn>
            <Btn onClick={() => editor.chain().focus().toggleItalic().run()} disabled={!editor.can().chain().focus().toggleItalic().run()} active={editor.isActive('italic')}>
                <Italic size={16} />
            </Btn>
            <Btn onClick={() => editor.chain().focus().toggleStrike().run()} disabled={!editor.can().chain().focus().toggleStrike().run()} active={editor.isActive('strike')}>
                <Strikethrough size={16} />
            </Btn>
            <Btn onClick={() => editor.chain().focus().toggleCode().run()} disabled={!editor.can().chain().focus().toggleCode().run()} active={editor.isActive('code')}>
                <Code size={16} />
            </Btn>

            <div className="w-px h-6 bg-gray-300 dark:bg-gray-700 mx-1"></div>

            <Btn onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()} active={editor.isActive('heading', { level: 1 })}>
                <Heading1 size={16} />
            </Btn>
            <Btn onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()} active={editor.isActive('heading', { level: 2 })}>
                <Heading2 size={16} />
            </Btn>

            <div className="w-px h-6 bg-gray-300 dark:bg-gray-700 mx-1"></div>

            <Btn onClick={() => editor.chain().focus().setTextAlign('left').run()} active={editor.isActive({ textAlign: 'left' })}>
                <AlignLeft size={16} />
            </Btn>
            <Btn onClick={() => editor.chain().focus().setTextAlign('center').run()} active={editor.isActive({ textAlign: 'center' })}>
                <AlignCenter size={16} />
            </Btn>
            <Btn onClick={() => editor.chain().focus().setTextAlign('right').run()} active={editor.isActive({ textAlign: 'right' })}>
                <AlignRight size={16} />
            </Btn>
            <Btn onClick={() => editor.chain().focus().setTextAlign('justify').run()} active={editor.isActive({ textAlign: 'justify' })}>
                <AlignJustify size={16} />
            </Btn>

            <div className="w-px h-6 bg-gray-300 dark:bg-gray-700 mx-1"></div>

            <Btn onClick={() => editor.chain().focus().toggleBulletList().run()} active={editor.isActive('bulletList')}>
                <List size={16} />
            </Btn>
            <Btn onClick={() => editor.chain().focus().toggleOrderedList().run()} active={editor.isActive('orderedList')}>
                <ListOrdered size={16} />
            </Btn>
            <Btn onClick={() => editor.chain().focus().toggleBlockquote().run()} active={editor.isActive('blockquote')}>
                <Quote size={16} />
            </Btn>

            <div className="w-px h-6 bg-gray-300 dark:bg-gray-700 mx-1"></div>

            <Btn onClick={setLink} active={editor.isActive('link')}>
                <LinkIcon size={16} />
            </Btn>
            
            <div className="w-px h-6 bg-gray-300 dark:bg-gray-700 mx-1"></div>

            {/* Hidden file inputs */}
            <input type="file" ref={imageInputRef} onChange={(e) => handleUpload(e, 'image')} accept="image/*" className="hidden" />
            <input type="file" ref={audioInputRef} onChange={(e) => handleUpload(e, 'audio')} accept="audio/*" className="hidden" />
            <input type="file" ref={videoInputRef} onChange={(e) => handleUpload(e, 'video')} accept="video/*" className="hidden" />

            <Btn onClick={() => imageInputRef.current?.click()} disabled={isUploading}>
                <ImageIcon size={16} />
            </Btn>
            <Btn onClick={() => videoInputRef.current?.click()} disabled={isUploading}>
                <Film size={16} />
            </Btn>
            <Btn onClick={() => audioInputRef.current?.click()} disabled={isUploading}>
                <Music size={16} />
            </Btn>
            <Btn onClick={addYoutubeVideo} disabled={isUploading}>
                <YoutubeIcon size={16} />
            </Btn>

            <div className="w-px h-6 bg-gray-300 dark:bg-gray-700 mx-1"></div>

            <Btn onClick={() => editor.chain().focus().undo().run()} disabled={!editor.can().chain().focus().undo().run()}>
                <Undo size={16} />
            </Btn>
            <Btn onClick={() => editor.chain().focus().redo().run()} disabled={!editor.can().chain().focus().redo().run()}>
                <Redo size={16} />
            </Btn>
        </div>
    );
};

export default function Editor({ content, onChange }: EditorProps) {
    const editor = useEditor({
        immediatelyRender: false,
        extensions: [
            StarterKit,
            Image.configure({
                inline: true,
                HTMLAttributes: {
                    class: 'rounded-xl max-w-full h-auto object-cover my-6 shadow-sm border border-gray-100 dark:border-gray-800 block',
                },
            }),
            Youtube.configure({
                inline: false,
                HTMLAttributes: {
                    class: 'w-full aspect-video rounded-xl my-6 shadow-sm',
                },
            }),
            Link.configure({
                openOnClick: false,
                HTMLAttributes: {
                    class: 'text-blue-600 dark:text-blue-400 underline underline-offset-4 decoration-blue-300 dark:decoration-blue-700/50 hover:decoration-blue-600 dark:hover:decoration-blue-400 transition-colors',
                },
            }),
            TextAlign.configure({
                types: ['heading', 'paragraph'],
            }),
        ],
        content,
        editorProps: {
            attributes: {
                class: 'prose prose-sm sm:prose-base dark:prose-invert max-w-none focus:outline-none min-h-[300px] p-6 leading-relaxed bg-white dark:bg-black rounded-b-xl border border-gray-200 dark:border-gray-800 border-t-0 font-serif',
            },
        },
        onUpdate: ({ editor }) => {
            onChange(editor.getHTML());
        },
    });

    return (
        <div className="editor-container shadow-sm rounded-xl [&_.ProseMirror]:min-h-[400px]">
            <MenuBar editor={editor} />
            <EditorContent editor={editor} />
        </div>
    );
}
