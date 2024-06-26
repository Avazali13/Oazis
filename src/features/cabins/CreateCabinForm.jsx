/* eslint-disable no-unused-vars */
import styled from "styled-components";

import Input from "../../ui/Input";
import Form from "../../ui/Form";
import Button from "../../ui/Button";
import FileInput from "../../ui/FileInput";
import Textarea from "../../ui/Textarea";
import { useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createEditCabin } from "../../services/apiCabins";
import toast from "react-hot-toast";
import FormRow1 from "../../ui/FormRow";

function CreateCabinForm({cabinToEdit={}}) {
  const {id:editId,...editValues}=cabinToEdit

  const isEditSession=Boolean(editId)
  const { register, handleSubmit, reset, getValues, formState } = useForm({
    defaultValues: isEditSession ? editValues : {}
  });
  //const { error } = formData
  const { errors } = formState;


  const queryClient = useQueryClient();

  const { mutate:createCabin, isLoading: isCreating } = useMutation({
    mutationFn: createEditCabin,
    onSuccess: () => {
      toast.success("New cabin successflly created");
      queryClient.invalidateQueries({
        queryKey: ["cabins"],
      });
      reset();
    },
    onError: (err) => toast.error(err.message),
  });

  const { mutate:editCabin, isLoading: isEditing } = useMutation({
    mutationFn:({newCabinData,id})=> createEditCabin(newCabinData,id),
    onSuccess: () => {
      toast.success("Cabin successflly edited");
      queryClient.invalidateQueries({
        queryKey: ["cabins"],
      });
      reset();
    },
    onError: (err) => toast.error(err.message),
  });

const isWorking=isCreating || isEditing

  function onSubmit(data) {

 const image=typeof data.image==='string' ? data.image : data.image[0]

 if(isEditSession) editCabin({newCabinData:{...data,image},id:editId});
else{createCabin({...data,image})}
  }

  function onError(err) {
    console.log(err);
  }

  return (
    <Form onSubmit={handleSubmit(onSubmit, onError)}>
      <FormRow1 error={errors?.name?.message} label="Cabin name">
        <Input
          disabled={isWorking}
          type="text"
          id="name"
          {...register("name", {
            required: "This field is required",
          })}
        />
      </FormRow1>

      <FormRow1 label="Maximum capacity" error={errors?.maxCapacity?.message}>
        <Input
          disabled={isWorking}
          type="number"
          id="maxCapacity"
          {...register("maxCapacity", {
            required: "This field is required",
            min: {
              value: 1,
              message: "Capacity should be at least 1",
            },
          })}
        />
      </FormRow1>

      <FormRow1 label="Regular Price" error={errors?.regularPrice?.message}>
        <Input
          disabled={isWorking}
          type="number"
          id="regularPrice"
          {...register("regularPrice", {
            required: "This field is required",
            min: {
              value: 1,
              message: "Regular price should be at least 1",
            },
          })}
        />
      </FormRow1>

      <FormRow1 label="Discount" error={errors?.discount?.message}>
        <Input
          disabled={isWorking}
          type="number"
          id="discount"
          defaultValue={0}
          {...register("discount", {
            required: "This field is required",
            min: {
              value: 1,
              message: "Discount should not be less than 1",
            },
            validate: (value) =>
              value <= getValues().regularPrice ||
              "discount should be less than regularPrice",
          })}
        />
      </FormRow1>

      <FormRow1
        label="Description for website"
        error={errors?.description?.message}
      >
        <Textarea
          disabled={isWorking}
          type="number"
          id="description"
          defaultValue=""
          {...register("description", {
            required: "This field is required",
          })}
        />
      </FormRow1>

      <FormRow1 label="Cabin photo">
        <FileInput id="image" accept="image/*" {...register("image",{
          required: isEditSession ? false : 'This field is required'
        })} />
      </FormRow1>

      <FormRow1>
        {/* type is an HTML attribute! */}
        <Button variation="secondary" type="reset">
          Cancel
        </Button>
        <Button disabled={isWorking}>{isEditSession ? 'Edit Cabin' : 'Create new cabin'}</Button>
      </FormRow1>
    </Form>
  );
}

export default CreateCabinForm;
