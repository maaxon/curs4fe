interface HtmlParserProps{
    html: string
}

export const HtmlParser = ({ html }:HtmlParserProps) => {
    return (
        <div dangerouslySetInnerHTML={{ __html: html }} />
    );
};