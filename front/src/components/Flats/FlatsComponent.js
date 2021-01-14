import { useEffect, useState } from "react";
import house from "./house.jpeg";
import { HeartFilled, HeartOutlined } from "@ant-design/icons";
import { Tooltip } from "antd";
import "antd/dist/antd.css";

export default function FlatsComponent() {
  const [flats, setFlats] = useState();
  const [ids, setIds] = useState([]);

  useEffect(() => {
    async function getFlats() {
      const response = await fetch("/flats");
      const result = await response.json();
      setFlats(JSON.parse(result).response);
    }
    getFlats();
  }, []);

  function like(id) {
    setIds((prevIds) => {
      if (!ids.includes(id)) {
        return [...prevIds, id];
      } else {
        return ids.filter((currentId) => currentId !== id);
      }
    });
  }

  return (
    <>
      <div className="container">
        <h1 className="title">Flats</h1>
        {flats &&
          flats.map((flat) => (
            <div key={flat.id} className="flatContainer">
              {/* <div className="imgContainer"> */}
              <img width="200" height="200" src={house} alt="Upcoming" />
              {/* </div> */}
              <div className="dataContainer">
                <div className="topDataContainer">
                  <h3>
                    <b>{flat.attributes.title}</b>
                  </h3>
                  <h4>
                    <b>
                      {flat.attributes.area}м<sup>2</sup>
                    </b>
                  </h4>
                </div>
                <div className="centerDataContainer">
                  <p>
                    <b>Адрес: </b>
                    г.{flat.attributes.address.city}, ул.
                    {flat.attributes.address.street}, д.
                    {flat.attributes.address.house}, кв.
                    {flat.attributes.address.room}
                  </p>
                  <p>
                    <b>Контактное лицо: </b>
                    {flat.relationships.attributes.last_name}{" "}
                    {flat.relationships.attributes.first_name}{" "}
                    {flat.relationships.attributes.middle_name}
                  </p>
                </div>
                <div className="bottomDataContainer">
                  <Tooltip placement="top" title="Like">
                    <button
                      className="heartButton"
                      onClick={() => {
                        like(flat.id);
                      }}
                    >
                      {ids.includes(flat.id) ? (
                        <HeartFilled className="heart" />
                      ) : (
                        <HeartOutlined />
                      )}
                    </button>
                  </Tooltip>
                </div>
              </div>
            </div>
          ))}
      </div>
    </>
  );
}
