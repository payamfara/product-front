export default ({text = 'در حال دریافت اطلاعات ...', color, isFullHeight = false}) => (
    <div
        className={`d-flex gap-3 justify-content-center align-items-center ${isFullHeight ? 'vh-100' : ''}`}
    >
        {text}
        <div className={`spinner-border text-${color}`} role="status">
            <span className="visually-hidden">{text}</span>
        </div>
    </div>
);