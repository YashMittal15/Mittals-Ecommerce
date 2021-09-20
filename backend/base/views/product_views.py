from django.shortcuts import render
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated, IsAdminUser
from rest_framework.response import Response
from base.models import Product

from base.serializers import ProductSerializer
from rest_framework import status

@api_view(['GET'])
def getProducts(request):
    query = request.query_params.get('keyword')
    print('query:', query)
    if query == None:
        query=''

    products = Product.objects.filter(Name__icontains=query)
    serializer = ProductSerializer(products, many=True)
    return Response(serializer.data)


@api_view(['GET'])
def getProduct(request,pk):
    product = Product.objects.get(_Id=pk)
    serializer = ProductSerializer(product, many=False)
    return Response(serializer.data)


@api_view(['POST'])
@permission_classes([IsAdminUser])
def createProduct(request):
    user = request.user
    product = Product.objects.create(
        user=user,
        Name= 'Sample Name',
        Price=0,
        Brand= 'sample brand',
        InStock=0,
        Category='Sample category',
        Description=''
    )
    serializer = ProductSerializer(product, many=False)
    return Response(serializer.data)

@api_view(['PUT'])
@permission_classes([IsAdminUser])
def updateProduct(request,pk):
    data = request.data
    product = Product.objects.get(_Id=pk)

    product.Name = data['Name']
    product.Price = data['Price']
    product.Brand = data['Brand']
    product.Category = data['Category']
    product.InStock = data['InStock']
    product.Description = data['Description']

    product.save()
    serializer = ProductSerializer(product, many=False)
    return Response(serializer.data)

@api_view(['DELETE'])
@permission_classes([IsAdminUser])
def deleteProduct(request,pk):
    product = Product.objects.get(_Id=pk)
    product.delete()
    return Response('Product Deleted')

@api_view(['POST'])
def uploadImage(request):
    data = request.data

    product_Id = data['product_Id']
    product = Product.objects.get(_Id=product_Id)

    product.image = request.FILES.get('image')
    product.save()
    return Response('Image Uploaded Successfully')