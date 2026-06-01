import { createNativeStackNavigator } from '@react-navigation/native-stack';

import TabRoutes from '../tab';

import ActiveLoopScreen from '../../screens/ActiveLoopScreen';
import ArrivalScreen from '../../screens/ArrivalScreen';
import CreateLoopScreen from '../../screens/CreateLoopScreen';
import EmptyStateScreen from '../../screens/EmptyStateScreen';
import LoginScreen from '../../screens/LoginScreen';
import LoopStartedScreen from '../../screens/LoopStartedScreen';
import OnboardingScreen from '../../screens/OnboardingScreen';
import RegisterScreen from '../../screens/RegisterScreen';
import RouteConfirmationScreen from '../../screens/RouteConfirmationScreen';
import RouteDestinationScreen from '../../screens/RouteDestinationScreen';
import RouteOriginScreen from '../../screens/RouteOriginScreen';
import SplashScreen from '../../screens/SplashScreen';
import SuccessScreen from '../../screens/SuccessScreen';
import TermsScreen from '../../screens/TermsScreen';

const Stack = createNativeStackNavigator();


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
            <Stack.Screen name="main" component={TabRoutes} />
            <Stack.Screen name="empty_state" component={EmptyStateScreen} />
            <Stack.Screen name="route_origin" component={RouteOriginScreen} />
            <Stack.Screen name="route_destination" component={RouteDestinationScreen} />
            <Stack.Screen name="route_confirmation" component={RouteConfirmationScreen} />
            <Stack.Screen name="loop_started" component={LoopStartedScreen} />
            <Stack.Screen name="active_loop" component={ActiveLoopScreen} />
            <Stack.Screen name="arrival" component={ArrivalScreen} />
            <Stack.Screen name="splash" component={SplashScreen} />
            <Stack.Screen name="create_loop" component={CreateLoopScreen} />
            <Stack.Screen name="onboarding" component={OnboardingScreen} />
        </Stack.Navigator>
    );
}