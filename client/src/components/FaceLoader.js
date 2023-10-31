import React, {useState, useEffect} from 'react';
import '../css/Loader.css';
import { Dna } from 'react-loader-spinner';

const FaceLoader = ({ loading }) => {
    const [loadingMessage, setLoadingMessage] = useState('Scanning facial data');
  
    useEffect(() => {
      const intervalId = setInterval(() => {
        setLoadingMessage((prevMessage) => {
          if (prevMessage === 'Scanning facial data...') return 'Scanning facial data';
          return prevMessage + '.';
        });
      }, 500);
  
      return () => {
        clearInterval(intervalId);
      };
    }, []);

    if (!loading) return null;
  
    return (
        <div style={{position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', zIndex: 3,}}>
            <Dna
                visible={true}
                height="250"
                width="250"
                ariaLabel="dna-loading"
                wrapperStyle={{}}
                wrapperClass="dna-wrapper"
                loading={loading}
                opacity="50"
            />
            <p className='scan'>{loadingMessage}</p>
        </div>
    )
  }

  export default FaceLoader;