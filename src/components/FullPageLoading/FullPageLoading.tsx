import "./FullPageLoading.less";

interface FullPageLoadingProps {
    message: string;
}

export default function FullPageLoading({message = "Loading..."}: FullPageLoadingProps) {
    return (
        <h1 className="full-page-loading" data-testid="app-loading">
            {message}
        </h1>

    );
}
