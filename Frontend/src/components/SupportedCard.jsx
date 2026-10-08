function SupportedCard({image,name}){
    return(
        <div className="bg-white border rounded-xl p-4 text-center">
            <div className="text-2xl">{image}</div>
                <p className="text-sm font-medium mt-2">
                    {name}
                </p>
        </div>
    )
}
export default SupportedCard