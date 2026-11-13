# Flujo de cobro — ace-step-ui

## Regla
Nunca se oculta el precio para pedir el email. Los precios están publicados en `plataforma/precios.json`.

## Métodos de pago aceptados
- Transferencia bancaria (SEPA)
- Tarjeta de crédito/débito (vía plataforma de pago externa)
- Factura mensual para planes de alojamiento gestionado

## Flujo de contratación
1. El cliente elige un plan en `plataforma/OFERTA.md`
2. Se emite factura con los precios de `plataforma/precios.json`
3. Para alojamiento gestionado: se despliega la instancia y se entregan credenciales
4. Para entrenamiento LoRA: se reciben los datos del cliente, se entrena el modelo, se entregan los pesos
5. Para consultoría: se acordan horas y se factura al finalizar el trabajo

## Reembolsos
- Autoalojado: no aplica (software gratuito)
- Alojamiento gestionado: reembolso proporcional por días no consumidos si se cancela
- Entrenamiento LoRA: no reembolsable una vez iniciado el entrenamiento
- Consultoría: factura por horas trabajadas, sin reembolso por trabajo entregado
