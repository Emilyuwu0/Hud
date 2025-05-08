import classNames from 'classnames';

export default function Range({ value = 0, onChange, max = 100, className }) {
    return (
        <div
            className={classNames('w-12 h-0.5 relative flex items-center', {
                [className]: className
            })}
        >
            <span
                className="absolute left-0 h-full bg-[#00CC6A] rounded-full"
                style={{ width: (value / max) * 100 + '%' }}
            />
            <input
                step={1}
                max={max}
                value={value}
                onChange={onChange}
                type="range"
                className="w-full h-full"
            />
        </div>
    );
}
