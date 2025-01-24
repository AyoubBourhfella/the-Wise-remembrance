import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { Drawer } from 'expo-router/drawer';
import AppDrawer from '../../components/AppDrawer';



const MainLayout = () => {
	return (
		<GestureHandlerRootView style={{ flex: 1 }}>
			<Drawer
			
			drawerContent={props => <AppDrawer {...props} />}
			screenOptions={
				{
					
					headerShown: false,
					drawerStyle: {
						backgroundColor: 'transparent',
						
						width: '80%',
						borderTopRightRadius: 20,
						borderBottomRightRadius: 20,
					},
					drawerActiveTintColor: '#000',
					drawerInactiveTintColor: '#000',
					
					drawerItemStyle: {
				    
				}}
			}>
				
				<Drawer.Screen
					name="Settings" 
					options={{
						drawerLabel: 'Me',
						title: 'overview',
						headerShown: false
					}}/>
				<Drawer.Screen
					name="About" 
					options={{
						drawerLabel: 'Me',
						title: 'overview',
						headerShown: false
					}}/>
			</Drawer>
			
		</GestureHandlerRootView>
	);
};



export default MainLayout;
