import React, { useState,useRef ,useEffect  } from 'react';
import {useMap, useMapContext, APILoader, Provider } from '@uiw/react-amap';

const Example = () => {
 const poly = [[116.405289, 39.904987],
              [113.964458, 40.54664],
              [111.47836, 41.135964],
              [108.949297, 41.670904],
              [106.380111, 42.149509],
              [103.774185, 42.56996],
              [101.135432, 42.930601],
              [98.46826, 43.229964],
              [95.777529, 43.466798],
              [93.068486, 43.64009],
              [90.34669, 43.749086],
              [87.61792, 43.793308]]


    const warpper = useRef(null);
    const { map, state } = useMapContext();
    const { setContainer } = useMap({
      container: warpper.current,
      center: [116.397428, 39.90923],
      zoom: 10
    });
  
    useEffect(() => {
      if (map) {
        console.log("11111")
          const marker = new AMap.Marker({
            icon: new AMap.Icon({
              imageSize: new AMap.Size(25, 34),
              image: '//a.amap.com/jsapi_demos/static/demo-center/icons/poi-marker-default.png'
            }),
            position: [116.397428, 39.90923],
            offset: new AMap.Pixel(-13, -30)
          });
          // 创建点标记
        const marker1 = new AMap.Marker({
          position: new AMap.LngLat(116.32945,39.939772)
        });
          map.add(marker1);
        marker.setMap(state.map);
      }
    }, [map]);
    
    useEffect(() => {
      if (warpper.current) {
        setContainer(warpper.current);
      }
    }, [warpper.current]);
  
    return <div ref={warpper} style={{ width: '1500px', height: '800px', marginLeft:'100px'}} ></div>;
}

const PolylineExample = ({data}) => {
  return (
     <APILoader akey="0cc14139e08820fa2ed377bff0f00c60">
      <Provider><Example plan={data} /></Provider>
     </APILoader>
 )};

export default PolylineExample;