import { MaterialCommunityIcons as BaseMaterialCommunityIcons } from '@expo/vector-icons'
import React, { ComponentProps } from 'react'
import {
	Button as BaseButton,
	Text as BaseText,
	View as BaseView,
	ButtonProps,
	TextProps,
	ViewProps,
} from 'react-native'
import { useThemeContext } from '../contexts/theme'
import { Colors } from '../styles/colors'

export const Button = (props: ButtonProps) => {
	const { theme } = useThemeContext()

	return <BaseButton {...props} color={Colors[theme].primary} />
}

export const Text = ({ style, ...props }: TextProps) => {
	const { theme } = useThemeContext()
	console.log(theme)

	return (
		<BaseText
			{...props}
			style={[{ color: theme === 'dark' ? 'white' : 'black' }, style]}
		/>
	)
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

export const MaterialCommunityIcons = ({
	style,
	...props
}: ComponentProps<typeof BaseMaterialCommunityIcons>) => {
	const { theme } = useThemeContext()

	return <BaseMaterialCommunityIcons {...props} color={Colors[theme].primary} />
}
