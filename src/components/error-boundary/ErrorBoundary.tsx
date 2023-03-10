import React, { Component } from 'react'

export class ErrorBoundary extends Component<any, { hasError: boolean }> {
    
	constructor(props : any) {
		super(props)

		this.state = {
			hasError: false
		}
	}

	static getDerivedStateFromError(error:any) {
		return { hasError: true }
	}

	componentDidCatch(error: any, info: any) {
		console.log(info)
	}

	render() {
		if (this.state.hasError) {
			return <div style={{display:'flex' , justifyContent: "center", alignItems: "center"}}><h1 >Oops, Something has gone wrong</h1></div>
		}
		return this.props.children
	}
}

export default ErrorBoundary