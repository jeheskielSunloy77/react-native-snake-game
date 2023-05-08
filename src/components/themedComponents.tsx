import { MaterialCommunityIcons as BaseMaterialCommunityIcons } from '@expo/vector-icons'
import React, { ComponentProps } from 'react'
import {
	Button as BaseButton,
	Switch as BaseSwitch,
	Text as BaseText,
	View as BaseView,
	ButtonProps,
	SwitchProps,
	TextProps,
	ViewProps,
} from 'react-native'
import { useThemeContext } from '../contexts/theme'
import { Colors } from '../styles/colors'

export const Button = (props: ButtonProps) => {
	const { theme } = useThemeContext()

	return <BaseButton {...props} color={Colors[theme].primary} />
}

export const Text = ({
	style,
	reverseColor,
	...props
}: TextProps & { reverseColor?: boolean }) => {
	const { theme } = useThemeContext()
	const color = reverseColor
		? theme === 'dark'
			? 'black'
			: 'white'
		: theme === 'dark'
		? 'white'
		: 'black'

	return <BaseText {...props} style={[{ color }, style]} />
}

export const View = ({ style, ...props }: ViewProps) => {
	const { theme } = useThemeContext()

	return (
		<BaseView
			{...props}
			style={[{ backgroundColor: Colors[theme].primary }, style]}
		/>
	)
}

interface MaterialCommunityIconsProps
	extends Omit<ComponentProps<typeof BaseMaterialCommunityIcons>, 'color'> {
	color?: 'base' | 'primary'
}

export const MaterialCommunityIcons = ({
	style,
	color = 'base',
	...props
}: MaterialCommunityIconsProps) => {
	const { theme } = useThemeContext()

	return <BaseMaterialCommunityIcons {...props} color={Colors[theme][color]} />
}

export const Switch = (props: SwitchProps) => {
	const { theme } = useThemeContext()

	return (
		<BaseSwitch
			{...props}
			thumbColor={props.value ? Colors[theme].primary : Colors[theme].background}
		/>
	)
}
