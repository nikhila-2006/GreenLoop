function DetailsCard({title,result,Icon}){
    return(
        <div  className="flex items-center gap-5">
            <div className="w-11 h-11 rounded-full bg-blue-100 flex items-center justify-center">
                <Icon size={20} />
            </div>
            <div>
                <p className="text-sm text-gray-500">
                    {title}
                </p>
                <p className="font-semibold text-gray-900">
                    {result}
                </p>
            </div>
        </div>
    )
}
export default DetailsCard