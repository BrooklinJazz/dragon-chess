import React from "react"
import { configure, addDecorator } from '@storybook/react'
import { Provider } from 'react-redux'
import store from "../src/store"
import {withProvider } from "../src/test-utils"

addDecorator(withProvider)