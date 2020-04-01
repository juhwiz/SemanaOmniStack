import React from 'react';
import {Feather} from '@expo/vector-icons';
import { useNavigation, useRoute } from '@react-navigation/native'; //useRoute serve para pegar informações especificas da página atual
import { View, TouchableOpacity, Image, Text, Linking, ScrollView } from 'react-native';
import * as MailComposer from 'expo-mail-composer'; //biblioteca para enviar email

import style from './styles'; //importando "css"

import logoImg from '../../assets/logo.png'; //Importando a logo do cabeçalho


export default function Detail(){
    const navigation = useNavigation(); //navegação entre páginas
    const route = useRoute(); //rotas 

    const incident = route.params.incident; //Pegando os dados da outra página
    const message = `Olá ${incident.name}, estou entrando em contato pois gostaria de ajudar no caso "${incident.title}" com o valor de ${Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(incident.value)} `;

    function navigateBack(){ //função do batão voltar para página anterior
        navigation.goBack();
    }

    function sendMail(){ //função enviar Email
        MailComposer.composeAsync({ //Composição do Email
            subject: `Herói do caso: ${incident.title}`,
            recipients: [incident.email],
            body: message,
        })
    }

    function sendWhatsapp(){ //função enviar Whatsapp
        Linking.openURL(`whatsapp://send?phone=${incident.whatsapp}&text=${message}`); 
    }
    
    return(
        <ScrollView showsVerticalScrollIndicator={false}>  
        <View style={style.container}> 

            <View style={style.header}>
                <Image source={logoImg}/>

                <TouchableOpacity onPress={navigateBack}>
                    <Feather name="arrow-left" size={28} color="#E82041" />
                </TouchableOpacity>
            </View>
        

            <View style={style.incident}>
                <Text style={[style.incidentProperty, { marginTop: 0 }]}>ONG:</Text>
                <Text style={style.incidentValue}>{incident.name} de {incident.city}/{incident.uf}</Text>

                <Text style={style.incidentProperty}>CASO:</Text>
                <Text style={style.incidentValue}>{incident.title}</Text>

                <Text style={style.incidentProperty}>DESCRIÇÃO:</Text>
                <Text style={style.incidentValue}>{incident.description}</Text>

                <Text style={style.incidentProperty}>VALOR:</Text>
                <Text style={style.incidentValue}>
                    {Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(incident.value)}
                    </Text>
            </View>

            <View style={style.contactBox}>
                <Text style={style.heroTitle}>Salve o dia!</Text>
                <Text style={style.heroTitle}>Seja o herói desse caso.</Text>

                <Text style={style.heroDescription}>Entre em contato:</Text>

                <View style={style.actions}>
                    <TouchableOpacity style={style.action} onPress={sendWhatsapp}>
                        <Text style={style.actionText}>Whatsapp</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={style.action} onPress={sendMail}>
                        <Text style={style.actionText}>E-mail</Text>
                    </TouchableOpacity>
                </View>

            </View>
        </View>
        </ScrollView>
    );
}