import { useState, useEffect } from 'react';
import RoutMap from './page/RoutMap.jsx'
import SelectComponet from "./components/SelectComponent"
import PolylineExample from "./components/PolylineExample"
// import data from "./assets/data.json";

const App = () => {
  const [plan, setPlan] = useState();
const [data, setData] = useState({});
const [bestRoutName , setBestRoutName] = useState();
// const [plan, setPlan] = useState(() => {
//   return data.bestRoute
// });
// const bestRoutName = data.bestRoute.routName;

  useEffect(() => {
    fetch('/api/user/planningRoute')
      .then(response => {
        if (response.ok) {
          return response.json();
        }
        throw new Error('Network response was not ok.');
      })
      .then(data => {
        console.log(data)
        setData(data)
        setPlan(data.bestRoute);
        setBestRoutName(data.bestRoute.routName)
      })
  }, []);

  return (
          <>
            <SelectComponet data={data.routs} onDataPass={setPlan} bestRoutName={bestRoutName} />
            <RoutMap data={plan} />
            {/* <PolylineExample /> */}
          </>
        );
};

export default App;

//      <SelectComponet data={data.routs} onDataPass={setPlan} bestRoutName={bestRoutName} />
