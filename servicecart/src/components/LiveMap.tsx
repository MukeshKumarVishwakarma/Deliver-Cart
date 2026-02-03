import React, { useEffect } from 'react'
interface ILocation {
    latitude: number,
    longitude: number
}
interface Iprops {
    userLocation: ILocation
    deliveryBoyLocation: ILocation
}
import L, { LatLngExpression} from "leaflet"
import { MapContainer, Marker, Polyline, Popup, TileLayer, useMap} from 'react-leaflet'
import "leaflet/dist/leaflet.css"

function Recenter({positions}:{positions:[number,number]}){
    const map = useMap()
    useEffect(()=>{
        if(positions[0]!==0 && positions[1]!==0){
            map.setView(positions,map.getZoom(),{
                animate:true
            })
        }
    },[positions,map])
    return null
}

function LiveMap({ userLocation, deliveryBoyLocation }: Iprops) {
    const deliveryBoyIcon = L.icon({
        iconUrl: "https://cdn-icons-png.flaticon.com/128/9561/9561688.png",
        iconSize: [45, 45]
    })
    const userIcon = L.icon({
        iconUrl: "https://cdn-icons-png.flaticon.com/128/4821/4821951.png",
        iconSize: [45, 45]
    })

    const linePositions = deliveryBoyLocation && userLocation ?
    [
        [userLocation.latitude,userLocation.longitude],
        [deliveryBoyLocation.latitude,deliveryBoyLocation.longitude]
    ]:[]

    const center = deliveryBoyLocation
    ? [deliveryBoyLocation.latitude,deliveryBoyLocation.longitude]
    : [userLocation.latitude,userLocation.longitude];

    return (
        <div className='w-full h-[500px] rounded-xl overflow-hidden shadow relative z-2'>
            <MapContainer center={center as LatLngExpression} zoom={13} scrollWheelZoom={true} className='w-full h-full'>
                <Recenter positions={center as any} />
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                <Marker position={[userLocation.latitude,userLocation.longitude]} icon={userIcon} >
                    <Popup>Delivery Address</Popup>
                </Marker>
                {deliveryBoyLocation &&   <Marker position={[deliveryBoyLocation.latitude,deliveryBoyLocation.longitude]} icon={deliveryBoyIcon} >
                     <Popup>Delivery Boy</Popup>
                    </Marker>}
                    <Polyline positions={linePositions as any} color='green' />
            </MapContainer>
        </div>
    )
}

export default LiveMap
