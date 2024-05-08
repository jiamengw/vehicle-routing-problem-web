import React, { useRef, useEffect, useState } from 'react';
import {List} from 'antd'
import { useMap, useMapContext, APILoader, Provider} from '@uiw/react-amap';

const Example = ({plan=[]}) => {
  console.log(plan)
  const warpper = useRef(null);
  const { map, state } = useMapContext();

  const pathList = plan.paths?.map((path)=>{
    var pathStr = '';
    path.nodeList.map((node)=>{
      pathStr += (node.name+"(距离："+node.distance +" 时间："+node.duration +" 载重："+ node.demands +")=>");
    })
    return pathStr+"（总载重："+path.demands+",总时间："+path.duration+")";
  })

  const { setContainer } = useMap({
    container: warpper.current,
    center: [106.6428270000, 26.6177020000],
    zoom: 13
  });

  const originMarker = new AMap.Marker({
    icon: new AMap.Icon({
      imageSize: new AMap.Size(25, 34),
      image: '//a.amap.com/jsapi_demos/static/demo-center/icons/poi-marker-default.png'
    }),
    position: [106.623069, 26.677932],
    offset: new AMap.Pixel(-13, -30),
    title:"仓库",
    label:{
      content: "<div class='info'>仓库</div>",
      direction: 'right'
    }
  });
  
  const origingLat = new AMap.LngLat(106.623069, 26.677932);

  const renderPlan = (rout)=>{
    map.clearMap()
    map.add(originMarker);
    rout?.paths?.map((path)=>{
      let pathLng = [];
      pathLng.push(origingLat);
      path.nodeList.map((node)=>{
        const marker = new AMap.Marker({
          icon: new AMap.Icon({
            imageSize: new AMap.Size(25, 34),
            image: '//a.amap.com/jsapi_demos/static/demo-center/icons/poi-marker-default.png'
          }),
          position: [node.longitude, node.latitude],
          offset: new AMap.Pixel(-13, -30),
          title: node.name,
          label:{
            content: `<div class='info'>
                        <span>${node.name}</span>
                        <span>距离：${node.distance} 时间：${node.duration} 载重：${node.demands} <span>
                      </div>`,
            direction: 'right'
          }
        });
        map.add(marker);
        pathLng.push(new AMap.LngLat(node.longitude, node.latitude));
      });
      // 联线
      const polyline = new AMap.Polyline({
        strokeColor: "red",
        showDir: true,
        strokeWeight: 6,
        path: pathLng
      });
      map.add(polyline)
    });
    originMarker.setMap(state.map);
  };


  useEffect(() => {
    if (map) {
      console.log(111)
      renderPlan(plan);
    }
  }, [plan]);
  
  useEffect(() => {
    if (warpper.current) {
      setContainer(warpper.current);
    }
  }, [warpper.current]);

  return <>
    <div style={{ width: '1400px', marginLeft:'100px',marginBottom:'10px'}}>
      <List
        size="small"
        bordered
        dataSource={pathList}
        renderItem={(item) => <List.Item>{item}</List.Item>}
      />
      </div>
    <div ref={warpper} style={{ width: '1500px', height: '800px', marginLeft:'100px'}} />
  </>;
}

const RoutMap = ({data}) => {
 return (
    <APILoader akey="0cc14139e08820fa2ed377bff0f00c60">
      <Provider>
        <Example plan={data} />
      </Provider>
    </APILoader>
)};

// const RoutMap = () => (
//   <APILoader akey="0cc14139e08820fa2ed377bff0f00c60">
//     <Example />
//   </APILoader>
// );
export default RoutMap;