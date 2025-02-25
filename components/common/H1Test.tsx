const H1 = ({
    title,
    width = "570px",
    center,
    mb = "100px",
  }: {
    title: string;
    width?: string;
    center?: boolean;
    mb?: string;
  }) => {
    return (
      <>
        <div
          className={`wow fadeInUp w-full ${center ? "mx-auto text-center" : ""}`}
          data-wow-delay=".1s"
          style={{ maxWidth: width, marginBottom: mb }}
        >
          <h2 className="font-bold text-5xl self-center inline-block bg-gradient-to-r from-stone-400 via-white/90 to-stone-500 bg-clip-text text-transparent p-2">
            {title}
          </h2>
        </div>
      </>
    );
  };
  
  export default H1;
  