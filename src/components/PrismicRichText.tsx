import {
    PrismicRichText as BasePrismicRichText,
    JSXFunctionSerializer,
    JSXMapSerializer,
    PrismicLink,
    PrismicRichTextProps,
} from '@prismicio/react'
import { ReactNode } from 'react'

const defaultComponents: JSXMapSerializer | JSXFunctionSerializer = {
    heading1: ({ children }: { children: ReactNode }) => (
        <h2 className="font-bold text-3xl my-4">{children}</h2>
    ),
    heading2: ({ children }: { children: ReactNode }) => (
        <h3 className="font-bold text-2xl my-3">{children}</h3>
    ),
    heading3: ({ children }: { children: ReactNode }) => (
        <h4 className="font-bold text-xl my-2">{children}</h4>
    ),
    paragraph: ({ children }: { children: ReactNode }) => (
        <p className="my-4">{children}</p>
    ),
    preformatted: ({ node }) => (
        <pre className="my-4 p-4 border">{node.text}</pre>
    ),
    listItem: ({ children }) => <li>{children}</li>,
    oListItem: ({ children }) => <li>{children}</li>,
    list: ({ children }) => <ul className="list-disc">{children}</ul>,
    oList: ({ children }) => <ol className="list-decimal">{children}</ol>,
    image: ({ node }) => (
        <div className={`w-full`}>
            <img
                src={node.url}
                alt={node.alt ?? undefined}
                data-copyright={node.copyright ? node.copyright : undefined}
            />
        </div>
    ),
    embed: ({ node }) => (
        <div
            data-oembed={node.oembed.embed_url}
            data-oembed-type={node.oembed.type}
            data-oembed-provider={node.oembed.provider_name}
            dangerouslySetInnerHTML={{ __html: node.oembed.html ?? '' }}
        />
    ),
    hyperlink: ({ node, children }) => (
        <PrismicLink
            className="text-sky-600 underline hover:decoration-2"
            field={node.data}
        >
            {children}
        </PrismicLink>
    ),
}

export const PrismicRichText = ({
    components,
    ...props
}: PrismicRichTextProps) => {
    return (
        <BasePrismicRichText
            components={{ ...defaultComponents, ...components }}
            {...props}
        />
    )
}
