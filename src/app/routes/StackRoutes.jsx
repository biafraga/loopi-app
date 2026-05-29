import { Feather } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import colors from '../theme/colors';

import ActiveLoopScreen from '../screens/ActiveLoopScreen';
import ArrivalScreen from '../screens/ArrivalScreen';
import CreateLoopScreen from '../screens/CreateLoopScreen';
import EmptyStateScreen from '../screens/EmptyStateScreen';
import HistoryScreen from '../screens/HistoryScreen';
import HomeScreen from '../screens/HomeScreen';
import InstructionsScreen from '../screens/InstructionsScreen';
import LoginScreen from '../screens/LoginScreen';
import LoopStartedScreen from '../screens/LoopStartedScreen';
import PermissionsScreen from '../screens/PermissionsScreen';
import ProfileScreen from '../screens/ProfileScreen';
import ProposalScreen from '../screens/ProposalScreen';
import RegisterScreen from '../screens/RegisterScreen';
import RouteConfirmationScreen from '../screens/RouteConfirmationScreen';
import RouteDestinationScreen from '../screens/RouteDestinationScreen';
import RouteOriginScreen from '../screens/RouteOriginScreen';
import SplashScreen from '../screens/SplashScreen';
import StatsScreen from '../screens/StatsScreen';
import SuccessScreen from '../screens/SuccessScreen';
import TermsScreen from '../screens/TermsScreen';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

function BottomTabs() {
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

export default function StackRoutes() {
    return (
        <Stack.Navigator
            initialRouteName="splash"
            screenOptions={{ headerShown: false }}
        >
            <Stack.Screen name="login" component={LoginScreen} />
            <Stack.Screen name="register" component={RegisterScreen} />
            <Stack.Screen name="terms" component={TermsScreen} />
            <Stack.Screen name="success" component={SuccessScreen} />
            <Stack.Screen name="main" component={BottomTabs} />
            <Stack.Screen name="empty_state" component={EmptyStateScreen} />
            <Stack.Screen name="route_origin" component={RouteOriginScreen} />
            <Stack.Screen name="route_destination" component={RouteDestinationScreen} />
            <Stack.Screen name="route_confirmation" component={RouteConfirmationScreen} />
            <Stack.Screen name="loop_started" component={LoopStartedScreen} />
            <Stack.Screen name="active_loop" component={ActiveLoopScreen} />
            <Stack.Screen name="arrival" component={ArrivalScreen} />
            <Stack.Screen name="splash" component={SplashScreen} />
            <Stack.Screen name="proposal" component={ProposalScreen} />
            <Stack.Screen name="instructions" component={InstructionsScreen} />
            <Stack.Screen name="permissions" component={PermissionsScreen} />
            <Stack.Screen name="create_loop" component={CreateLoopScreen} />
        </Stack.Navigator>
    );
}