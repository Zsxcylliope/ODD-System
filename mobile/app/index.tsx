import { View, Text, StyleSheet,Image, TouchableOpacity } from 'react-native'
import React from 'react'
import {useRouter} from "expo-router";

const index = () => {
  const router = useRouter();
  return (
    <View style={style.container}>
      <View style={style.logoContainer}>
        <Image source={require('../assets/images/logo-white.png')}  //img location
        style={style.logo}/>
      </View>
      <View>
        <TouchableOpacity onPress={()=>router.push('/login')}>
          <View style={style.login}>
              <Text style={style.loginbox}>Login</Text>
          </View>
        </TouchableOpacity> 
        <View style={style.lineContainer}>
          <View style={style.line} />
            <Text style={style.orText}>or</Text>
          <View style={style.line} />
        </View>
        <View style={style.signupContainer}>
          <Text style={style.noAcc}>Don't have an account? </Text>
          <TouchableOpacity onPress={()=>router.push('/signup')}>
            <Text style={style.signupLink}>Sign Up</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  )
}

const style= StyleSheet.create({
  container:{
    backgroundColor:"#5387ED",
    flex:1,
    justifyContent:'center',
    alignItems:'center',
  },
  logoContainer:{
    alignSelf:'center',
  },
  logo:{
    maxHeight:300,
    maxWidth:300,
    resizeMode:'contain',
  },
  login:{
    backgroundColor:'#ff0900',
    width:300,
    height:50,
    borderRadius:10,
    justifyContent:'center',
    alignItems:'center',
    marginTop:20,
  },
  loginbox:{
    color:'white',

  },
  lineContainer: {
    flexDirection: 'row', //maka ma usa ang line og or
    alignItems: 'center',
    marginVertical: 20,
  },
  line: {
    flex: 1,
    height: 1,
    backgroundColor: 'black', // line color sa kilid sa or
  },
  orText: {
    marginHorizontal: 10,
    color: 'black', //or color
  },
  signupContainer:{
    alignItems:'center',
    textAlign: 'center'
  },
  noAcc: {
    color: 'white',
  },
  signupLink: {
    paddingTop:10,
    color: 'red',
    fontWeight: 'bold',
    fontSize: 15,
  },

})
export default index
