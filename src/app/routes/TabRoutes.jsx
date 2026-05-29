import { Feather } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import colors from '../theme/colors';

import HistoryScreen from '../screens/HistoryScreen';
import HomeScreen from '../screens/HomeScreen';
import ProfileScreen from '../screens/ProfileScreen';
import StatsScreen from '../screens/StatsScreen';

const Tab = createBottomTabNavigator();

export default function TabRoutes() {
    return (
        <Tab.Navigator
            screenOptions={{
                headerShown: false,
                tabBarStyle: {
                    backgroundColor: colors.DARK_PRIMARY,
                    borderTopColor: colors.BORDER,
                    height: 65,
                    paddingBottom: 10,
                    paddingTop: 5,
                },
                tabBarActiveTintColor: colors.PRIMARY,
                tabBarInactiveTintColor: colors.FADED_TEXT_COLOR,
            }}
        >
            <Tab.Screen
                name="home_tab"
                component={HomeScreen}
                options={{
                    tabBarIcon: ({ color }) => <Feather name="home" size={24} color={color} />,
                    tabBarLabel: 'Início',
                }}
            />
            <Tab.Screen
                name="history_tab"
                component={HistoryScreen}
                options={{
                    tabBarIcon: ({ color }) => <Feather name="clock" size={24} color={color} />,
                    tabBarLabel: 'Histórico',
                }}
            />
            <Tab.Screen
                name="stats_tab"
                component={StatsScreen}
                options={{
                    tabBarIcon: ({ color }) => <Feather name="bar-chart-2" size={24} color={color} />,
                    tabBarLabel: 'Estatísticas',
                }}
            />
            <Tab.Screen
                name="profile_tab"
                component={ProfileScreen}
                options={{
                    tabBarIcon: ({ color }) => <Feather name="user" size={24} color={color} />,
                    tabBarLabel: 'Perfil',
                }}
            />
        </Tab.Navigator>
    );
}