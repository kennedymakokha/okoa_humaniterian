export const HeaderItem = ({ title, header }) => {
    return (
        <div className={`flex w-1/5 ${header ? "font-bold flex items-center justify-center" : "w-1/5 border-r flex items-center justify-center"}     px-2  items-center justify-centetr`}>
            {title}
        </div>
    )
}