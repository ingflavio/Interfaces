export const Video = ({ titulo, descripcion, videoUrl, subsEsp, subsEng }) => {
  return (
    <div className="d-flex flex-column align-items-center">
      <h1 className="text-black">{titulo}</h1>
      <h2 className="text-black">{descripcion}</h2>
      {videoUrl ? (
        <video controls width="720" height="420">
          <source src={videoUrl} type="video/mp4" />
          Tu navegador no soporta el video.
          {subsEsp && (
            <track
              src={subsEsp}
              kind="subtitles"
              srcLang="es"
              label="Español"
              default
            />
          )}
          {subsEng && (
            <track
              src={subsEng}
              kind="subtitles"
              srcLang="en"
              label="Inglés"
            />
          )}
        </video>
      ) : (
        <p className="text-black-50">Cargando video...</p>
      )}
    </div>
  );
};