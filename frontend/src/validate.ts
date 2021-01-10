import Vue from 'vue'
import { ValidationProvider, ValidationObserver, extend, configure } from 'vee-validate'
import { ValidationRule } from 'vee-validate/dist/types/types'
import * as rules from 'vee-validate/dist/rules'
import { messages } from 'vee-validate/dist/locale/en.json'

// Configure validation
configure({
    bails: false,
    useConstraintAttrs: false
})

const typedRules = rules as Record<string, ValidationRule>
const typedMessages = messages as Record<string, string>

Object.keys(typedRules).forEach(rule => {
    extend(rule, {
        ...typedRules[rule],
        message: typedMessages[rule]
    })
})


// Register components
Vue.component('validation-observer', ValidationObserver)
Vue.component('validation-provider', ValidationProvider)