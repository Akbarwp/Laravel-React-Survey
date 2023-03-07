export default function PaginationLinks({meta, onPageClick}) {

    function pagination(e, link) {
        e.preventDefault();

        if (!link.url) {
            return;
        }

        onPageClick(link);
    }

    return (
        <>
            {meta.total > meta.per_page &&
                <div className="flex justify-center mt-10">
                    <div className="btn-group">
                        {meta.links && meta.links.map((link, index) => (
                            <button
                            key={index}
                            className={"btn btn-info " + (link.active ? "btn-active" : "")}
                            dangerouslySetInnerHTML={{ __html: link.label }}
                            onClick={(e) => pagination(e, link)}
                            ></button>
                        ))}
                    </div>
                </div>
            }
        </>
    );
}