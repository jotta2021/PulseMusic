import { Tabs } from "expo-router";
import Icon from '@expo/vector-icons/Ionicons'

export default function Layout(){
    return(
        <Tabs 
        screenOptions={{
            tabBarActiveBackgroundColor:'black',
            tabBarInactiveBackgroundColor:'black',
            tabBarInactiveTintColor:'white',
            tabBarActiveTintColor:'white'
            
        }}
        >
            <Tabs.Screen name="index" options={{title:'Home',headerShown:false,
tabBarIcon:({focused,size,color})=> {
    if(focused){
        return <Icon  name='home' size={size} color={'#1E90FF'}
        
        /> 
    }
    return  <Icon  name='home-outline' size={size} color={'#1E90FF'}/>
}
,

   

            }} />
            <Tabs.Screen name="search/search" options={{title:'Procurar',headerShown:false,
tabBarIcon:({focused,size,color})=> {

    return <Icon  name='search' size={size} color={'#1E90FF'}
    
    />

}
,



            }} 
            
            
            />
        </Tabs>
    )
}