from django.shortcuts import render
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated, IsAdminUser
from rest_framework.response import Response
from base.models import Product, Order, OrderItem, ShippingAddress

from base.serializers import ProductSerializer, OrderSerializer
from rest_framework import status
from datetime import datetime

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def addOrderItems(request):
    user= request.user
    data = request.data
    orderItems = data['orderItems']

    if orderItems and len(orderItems) == 0:
        return Response({'detail': 'No Order Items'}, status=status.HTTP_400_BAD_REQUEST)
    else:
        order=Order.objects.create(
            user=user,
            paymentMethod=data['paymentMethod'],
            taxPrice=data['taxPrice'],
            shippingPrice=data['shippingPrice'],
            totalPrice=data['totalPrice']
        )


        shipping = ShippingAddress.objects.create(
            order=order,
            name=data['shippingAddress']['name'],
            phoneNumber=data['shippingAddress']['phoneNumber'],
            address=data['shippingAddress']['address'],
            city=data['shippingAddress']['city'],
            pinCode=data['shippingAddress']['pinCode'],
            country=data['shippingAddress']['country']

        )


        for i in orderItems:
            product=Product.objects.get(_Id=i['product'])

            item = OrderItem.objects.create(
                product=product,
                order=order,
                Name=product.Name,
                qty=i['qty'],
                Price=i['Price'],
                image=product.image.url,

            )


            product.InStock -= item.qty
            product.save()
        serializer = OrderSerializer(order, many=False)
        return Response(serializer.data)


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def getMyOrders(request):
    user=request.user
    orders=user.order_set.all()
    serializer = OrderSerializer(orders, many=True)
    return Response(serializer.data)

@api_view(['GET'])
@permission_classes([IsAdminUser])
def getOrders(request):
    orders=Order.objects.all()
    serializer = OrderSerializer(orders, many=True)
    return Response(serializer.data)

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def getOrderById(request, pk):
    user=request.user
    try:
        order=Order.objects.get(_Id=pk)
        if user.is_staff or order.user==user:
            serializer = OrderSerializer(order, many=False)
            return Response(serializer.data)
        else:
            Response({'detail': 'Restricted View You Cannot See It'}, 
                    status=status.HTTP_400_BAD_REQUEST)
    except:
        return Response({'detail': 'Order Does Not Exist'}, status= status.HTTP_400_BAD_REQUEST)


@api_view(['PUT'])
@permission_classes([IsAuthenticated])
def updateOrderToPaid(request, pk):
    order = Order.objects.get(_Id=pk)

    order.isPaid = True
    order.paidAt = datetime.now()
    order.save()
    return Response('Order Has Been Paid')