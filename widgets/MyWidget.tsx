import { Button, HStack, Text, VStack } from '@expo/ui/swift-ui';
import { addUserInteractionListener, createWidget, WidgetEnvironment } from "expo-widgets";
import { useEffect } from 'react';

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
                <HStack>
                    <Button
                        label="-"
                        target="decrement"
                        onPress={() => ({ count: props.count - 1 })}
                    />
                    <Button
                        label="+"
                        target="increment"
                        onPress={() => ({ count: props.count + 1 })}
                    />
                </HStack>
            </VStack>
        );
    }

    return (
        <VStack>
            <Text>{props.count}</Text>
            <HStack>
                <Button
                    label="-"
                    target="decrement"
                    onPress={() => ({ count: props.count - 1 })}
                />
                <Button
                    label="+"
                    target="increment"
                    onPress={() => ({ count: props.count + 1 })}
                />
            </HStack>
        </VStack>
    );

}

const CounterWidget = createWidget('MyWidget', MyWidget);
export default CounterWidget;

CounterWidget.updateSnapshot({ count: 5 });
