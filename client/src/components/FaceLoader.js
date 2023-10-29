import React from 'react';
import '../css/Loader.css';
import { Dna } from 'react-loader-spinner';

const FaceLoader = ({ loading }) => {
    if (!loading) return null;
  
    return (
        <div>
            <Dna
                visible={true}
                height="80"
                width="80"
                ariaLabel="dna-loading"
                wrapperStyle={{}}
                wrapperClass="dna-wrapper"
            />
            <p>Scanning Facial Data...</p>
        </div>
    )
  }

  export default FaceLoader;