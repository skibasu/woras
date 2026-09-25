const SuccessMessage = () => {
    return (
        <div className="max-w-140 py-8">
            <p className="mb-2 uppercase font-slogan tracking-wide text-primary">You are all set!</p>
            <h2 className="font-base capitalize font-extrabold mb-6">
                Thanks for your <span className="text-primary">message!</span>
            </h2>
            <p className="mb-10">We’ve received your message and will get back to you as soon as possible. Usually within one business day. i glowna wiadonmosc musi zawiera slowo message alby byc w stylu ace</p>
            <button className="btn btn-primary">Send Another Message</button>
        </div>
    )
}

export default SuccessMessage
