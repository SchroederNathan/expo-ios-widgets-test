import { HStack, Text, VStack } from '@expo/ui/swift-ui';
import { createWidget, WidgetEnvironment } from "expo-widgets";

type MyWidgetProps = {
    count: number;
}

const MyWidget = (props: MyWidgetProps, environment: WidgetEnvironment) => {
    'widget';
    // Render different layouts based on size
    if (environment.widgetFamily === 'systemSmall') {
        return (
            <VStack>
                <Text>{props.count}</Text>
                <Text>SMALL WIDGET</Text>
            </VStack>
        );
    }

    return (
        <HStack>
            <Text>{props.count}</Text>
            <Text>SMALL WIDGET</Text>
        </HStack>
    );

}

const CounterWidget = createWidget('MyWidget', MyWidget);
export default CounterWidget;

CounterWidget.updateSnapshot({ count: 5 });
