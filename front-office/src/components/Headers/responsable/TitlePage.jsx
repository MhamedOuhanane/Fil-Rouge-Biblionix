

const TitlePage = ({ title, description = "" }) => {
    return (
        <div className="p-4 border-b border-amber-800 md:text-start text-center w-full">
            <h1 className="text-lg font-semibold text-amber-900">
                {title}
            </h1>
            <p className="text-sm text-amber-700">{description}</p>
        </div>
    )
}

export default TitlePage;