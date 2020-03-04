docker run \
   -it --rm \
   -v "$PWD":/application \
   packsdkandroiddocker.image \
   sh -c "$@"