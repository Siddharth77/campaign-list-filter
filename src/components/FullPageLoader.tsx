import LoaderGif from '../assets/loading.gif';

export default function FullPageLoader() {
  return (
    <div className="full-loader-container">
        <div className='full-loader'>
            <img src={LoaderGif} alt="loader" />
        </div>
    </div>
  );
}
