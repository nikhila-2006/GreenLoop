function StepsCard({title,description,Icon}){
    return(
        <div className="bg-white p-6 rounded-2xl shadow-sm">
            <div className="w-12 h-12 rounded-xl bg-green-100 flex items-center justify-center">
                    <Icon className="text-green-600" />
            </div>
            <h3 className="font-bold text-lg mt-5">
                {title}
            </h3>
            <p className="text-sm text-slate-600 mt-2">
                {description}
            </p>
        </div>
    )
}
export default StepsCard;