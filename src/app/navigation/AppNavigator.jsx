import { Feather } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import colors from '../theme/colors';

import ActiveLoopScreen from '../screens/ActiveLoopScreen';
import ArrivalScreen from '../screens/ArrivalScreen';
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
                name="HomeTab"
                component={HomeScreen}
                options={{
                    tabBarIcon: ({ color }) => <Feather name="home" size={24} color={color} />,
                    tabBarLabel: 'Início',
                }}
            />
            <Tab.Screen
                name="HistoryTab"
                component={HistoryScreen}
                options={{
                    tabBarIcon: ({ color }) => <Feather name="clock" size={24} color={color} />,
                    tabBarLabel: 'Histórico',
                }}
            />
            <Tab.Screen
                name="StatsTab"
                component={StatsScreen}
                options={{
                    tabBarIcon: ({ color }) => <Feather name="bar-chart-2" size={24} color={color} />,
                    tabBarLabel: 'Estatísticas',
                }}
            />
            <Tab.Screen
                name="ProfileTab"
                component={ProfileScreen}
                options={{
                    tabBarIcon: ({ color }) => <Feather name="user" size={24} color={color} />,
                    tabBarLabel: 'Perfil',
                }}
            />
        </Tab.Navigator>
    );
}

export default function AppNavigator() {
    return (
        <Stack.Navigator
            initialRouteName="Splash"
            screenOptions={{ headerShown: false }}
        >
            <Stack.Screen name="Login" component={LoginScreen} />
            <Stack.Screen name="Register" component={RegisterScreen} />
            <Stack.Screen name="Terms" component={TermsScreen} />
            <Stack.Screen name="Success" component={SuccessScreen} />
            <Stack.Screen name="Main" component={BottomTabs} />
            <Stack.Screen name="EmptyState" component={EmptyStateScreen} />
            <Stack.Screen name="RouteOrigin" component={RouteOriginScreen} />
            <Stack.Screen name="RouteDestination" component={RouteDestinationScreen} />
            <Stack.Screen name="RouteConfirmation" component={RouteConfirmationScreen} />
            <Stack.Screen name="LoopStarted" component={LoopStartedScreen} />
            <Stack.Screen name="ActiveLoop" component={ActiveLoopScreen} />
            <Stack.Screen name="Arrival" component={ArrivalScreen} />
            <Stack.Screen name="Splash" component={SplashScreen} />
            <Stack.Screen name="Proposal" component={ProposalScreen} />
            <Stack.Screen name="Instructions" component={InstructionsScreen} />
            <Stack.Screen name="Permissions" component={PermissionsScreen} />
        </Stack.Navigator>
    );
}