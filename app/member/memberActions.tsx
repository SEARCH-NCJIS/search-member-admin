'use client';
// TODO" Add Toast Notifications on Success/Failure

import React, { useState, FormEvent } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select';

import { Textarea } from '@/components/ui/textarea';

import type { Member } from '../types/member';
import { Spinner } from '@/components/ui/spinner';
import { Checkbox } from '@/components/ui/checkbox';

export function MemberActions({ member }: { member: Member }) {
  return (
    <div className='flex items-center gap-2'>
      <EditMemberDialog {...member} />
      <ReplaceMemberDialog {...member} />
    </div>
  );
}

function EditMemberDialog({
  _id,
  firstName,
  lastName,
  title,
  state,
  email,
  phone,
  address,
  city,
  zipCode,
  isBoard,
  boardRole,
  tags,
  notes,
  endOfTerm,
  alternate,
  businessPhone,
  cellPhone,
  photoUrl,
  appointingOfficial,
  appointingOfficialTitle,
  appointmentDate
}: Member) {
  const [open, setOpen] = useState(false);
  const [formState, setFormState] = useState({
    _id,
    firstName,
    lastName,
    title,
    state,
    email,
    phone,
    address,
    city,
    zipCode,
    isBoard: Boolean(isBoard) || false,
    boardRole: boardRole || '',
    tags: tags || [],
    notes: notes || '',
    endOfTerm,
    alternate: alternate || '',
    businessPhone: businessPhone || '',
    cellPhone: cellPhone || '',
    photoUrl: photoUrl || '',
    appointingOfficial: appointingOfficial || '',
    appointingOfficialTitle: appointingOfficialTitle || '',
    appointmentDate: appointmentDate || ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      await fetch(`/api/member/${_id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formState)
      });
    } catch (error) {
      console.error('Error updating member:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {/* TODO: Edit Hover Status */}
        <Button className='bg-[#128BC1] text-white' size='sm'>
          Edit Member Details
        </Button>
      </DialogTrigger>
      <DialogContent className='max-w-lg sm:max-w-[900px]'>
        <DialogHeader>
          <DialogTitle className='flex items-center justify-between mr-25'>
            <div className='flex'>
              Edit Member: {firstName} {lastName} of {state}
            </div>
          </DialogTitle>
        </DialogHeader>

        <div className='overflow-y-auto max-h-[60vh] pr-2'>
          <form onSubmit={onSubmit} className='space-y-4 mt-2'>
            <div className='flex items-center gap-2'>
              <Checkbox
                className=''
                id='toggle'
                checked={formState.isBoard}
                onCheckedChange={checked =>
                  setFormState(fs => ({ ...fs, isBoard: Boolean(checked) }))
                }
              />
              <Label htmlFor='toggle' className=''>
                Board Member
              </Label>
              <Label htmlFor='edit-boardRole' className='ml-4'>
                Select Board Role:
              </Label>
              <Select
                value={formState.boardRole}
                onValueChange={value =>
                  setFormState(fs => ({ ...fs, boardRole: value }))
                }
              >
                <SelectTrigger className='w-[180px] h-5'>
                  <SelectValue>Select Role</SelectValue>
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectItem value='chair' id='edit-boardRole'>
                      Chair
                    </SelectItem>
                    <SelectItem value='vice-chair' id='edit-boardRole'>
                      Vice-Chair
                    </SelectItem>
                    <SelectItem value='member' id='edit-boardRole'>
                      Member
                    </SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
            <div className='grid grid-cols-1 sm:grid-cols-2 gap-3 space-y-2 sm:space-y-0'>
              <div className='space-y-2'>
                <Label htmlFor='edit-title'>Title</Label>
                <Input
                  id='edit-title'
                  value={formState.title}
                  onChange={e =>
                    setFormState(fs => ({ ...fs, title: e.target.value }))
                  }
                />
              </div>
              <div className='space-y-2'>
                <Label htmlFor='edit-alternate'>Alternate</Label>
                <Input
                  id='edit-alternate'
                  value={formState.alternate}
                  onChange={e =>
                    setFormState(fs => ({ ...fs, alternate: e.target.value }))
                  }
                />
              </div>
              <div className='space-y-2'>
                <Label htmlFor='edit-firstName'>First Name</Label>
                <Input
                  id='edit-firstName'
                  value={formState.firstName}
                  onChange={e =>
                    setFormState(fs => ({ ...fs, firstName: e.target.value }))
                  }
                />
              </div>
              <div className='space-y-2'>
                <Label htmlFor='edit-lastName'>Last Name</Label>
                <Input
                  id='edit-lastName'
                  value={formState.lastName}
                  onChange={e =>
                    setFormState(fs => ({ ...fs, lastName: e.target.value }))
                  }
                />
              </div>
            </div>
            <div className='grid grid-cols-1 sm:grid-cols-3 gap-3 space-y-2 sm:space-y-0'>
              <div className='space-y-2'>
                <Label htmlFor='edit-appointingOfficial'>
                  Appointing Official
                </Label>
                <Input
                  id='edit-appointingOfficial'
                  value={formState.appointingOfficial}
                  onChange={e =>
                    setFormState(fs => ({
                      ...fs,
                      appointingOfficial: e.target.value
                    }))
                  }
                />
              </div>
              <div className='space-y-2'>
                <Label htmlFor='edit-appointingOfficialTitle'>Title</Label>
                <Input
                  id='edit-appointingOfficialTitle'
                  value={formState.appointingOfficialTitle}
                  onChange={e =>
                    setFormState(fs => ({
                      ...fs,
                      appointingOfficialTitle: e.target.value
                    }))
                  }
                />
              </div>
              <div className='space-y-2'>
                <Label htmlFor='edit-appointmentDate'>Appointment Date</Label>
                <Input
                  id='edit-appointmentDate'
                  value={formState.appointmentDate}
                  onChange={e =>
                    setFormState(fs => ({
                      ...fs,
                      appointmentDate: e.target.value
                    }))
                  }
                />
              </div>
              <div className='space-y-2'>
                <Label htmlFor='edit-email'>Email</Label>
                <Input
                  id='edit-email'
                  value={formState.email}
                  onChange={e =>
                    setFormState(fs => ({ ...fs, email: e.target.value }))
                  }
                />
              </div>
              <div className='space-y-2'>
                <Label htmlFor='edit-businessPhone'>Business Phone</Label>
                <Input
                  id='edit-businessPhone'
                  value={formState.businessPhone}
                  onChange={e =>
                    setFormState(fs => ({
                      ...fs,
                      businessPhone: e.target.value
                    }))
                  }
                />
              </div>
              <div className='space-y-2'>
                <Label htmlFor='edit-cellPhone'>Cell Phone</Label>
                <Input
                  id='edit-cellPhone'
                  value={formState.cellPhone}
                  onChange={e =>
                    setFormState(fs => ({ ...fs, cellPhone: e.target.value }))
                  }
                />
              </div>
              <div className='space-y-2'>
                <Label htmlFor='edit-address'>Address</Label>
                <Input
                  id='edit-address'
                  value={formState.address}
                  onChange={e =>
                    setFormState(fs => ({ ...fs, address: e.target.value }))
                  }
                />
              </div>
              <div className='space-y-2'>
                <Label htmlFor='edit-city'>City</Label>
                <Input
                  id='edit-city'
                  value={formState.city}
                  onChange={e =>
                    setFormState(fs => ({ ...fs, city: e.target.value }))
                  }
                />
              </div>
              <div className='space-y-2'>
                <Label htmlFor='edit-zipCode'>Zip Code</Label>
                <Input
                  id='edit-zipCode'
                  value={formState.zipCode}
                  onChange={e =>
                    setFormState(fs => ({ ...fs, zipCode: e.target.value }))
                  }
                />
              </div>
            </div>
            <div className='grid grid-cols-1'>
              <div className='space-y-2'>
                <Label htmlFor='edit-photoUrl'>Photo URL</Label>
                <Input
                  id='edit-photoUrl'
                  value={formState.photoUrl}
                  onChange={e =>
                    setFormState(fs => ({ ...fs, photoUrl: e.target.value }))
                  }
                />
              </div>
              <div className='space-y-2 mt-2'>
                <Label htmlFor='edit-notes'>Notes</Label>
                <Textarea
                  id='edit-notes'
                  value={formState.notes}
                  onChange={e =>
                    setFormState(fs => ({ ...fs, notes: e.target.value }))
                  }
                />
              </div>
            </div>
            <DialogFooter className='mt-2'>
              <Button
                className='w-32 h-8'
                type='submit'
                disabled={isSubmitting}
              >
                {isSubmitting ? <Spinner /> : 'Save Changes'}
              </Button>
            </DialogFooter>
          </form>
        </div>
      </DialogContent>
    </Dialog>
  );
}

function ReplaceMemberDialog({
  _id,
  firstName,
  lastName,
  title,
  agency,
  state,
  email,
  phone,
  address,
  city,
  zipCode,
  isBoard,
  boardRole,
  tags,
  notes,
  endOfTerm,
  alternate,
  businessPhone,
  cellPhone,
  photoUrl,
  appointingOfficial,
  appointingOfficialTitle,
  appointmentDate
}: Member) {
  const [open, setOpen] = useState(false);
  const [formState, setFormState] = useState({
    _id,
    firstName,
    lastName,
    title,
    agency,
    state,
    email,
    phone,
    address,
    city,
    zipCode,
    isBoard: isBoard || false,
    boardRole: boardRole || '',
    tags: tags || [],
    notes: notes || '',
    endOfTerm,
    alternate: alternate || '',
    businessPhone: businessPhone || '',
    cellPhone: cellPhone || '',
    photoUrl: photoUrl || '',
    appointingOfficial: appointingOfficial || '',
    appointingOfficialTitle: appointingOfficialTitle || '',
    appointmentDate: appointmentDate || ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      await fetch(`/api/members/${_id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formState)
      });
    } catch (error) {
      console.error('Error updating member:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {/* TODO: Edit Hover Status */}
        <Button className=' text-white' variant='destructive' size='sm'>
          Replace Member
        </Button>
      </DialogTrigger>
      <DialogContent className='max-w-lg sm:max-w-[900px]'>
        <DialogHeader>
          <DialogTitle>
            Replace Member: {firstName} {lastName} of {state}
          </DialogTitle>
        </DialogHeader>

        <div className='overflow-y-auto max-h-[60vh] pr-2'>
          <form onSubmit={onSubmit} className='space-y-4 mt-2'>
            <div className='space-y-2'>
              <Label htmlFor='edit-agency'>Agency</Label>
              <Input
                id='edit-agency'
                value={formState.agency}
                onChange={e =>
                  setFormState(fs => ({ ...fs, agency: e.target.value }))
                }
              />
            </div>
            <div className='grid grid-cols-1 sm:grid-cols-2 gap-3 space-y-2 sm:space-y-0'>
              <div className='space-y-2'>
                <Label htmlFor='edit-title'>Title</Label>
                <Input
                  id='edit-title'
                  value={formState.title}
                  onChange={e =>
                    setFormState(fs => ({ ...fs, title: e.target.value }))
                  }
                />
              </div>
              <div className='space-y-2'>
                <Label htmlFor='edit-alternate'>Alternate</Label>
                <Input
                  id='edit-alternate'
                  value={formState.alternate}
                  onChange={e =>
                    setFormState(fs => ({ ...fs, alternate: e.target.value }))
                  }
                />
              </div>
              <div className='space-y-2'>
                <Label htmlFor='edit-firstName'>First Name</Label>
                <Input
                  id='edit-firstName'
                  value={formState.firstName}
                  onChange={e =>
                    setFormState(fs => ({ ...fs, firstName: e.target.value }))
                  }
                />
              </div>
              <div className='space-y-2'>
                <Label htmlFor='edit-lastName'>Last Name</Label>
                <Input
                  id='edit-lastName'
                  value={formState.lastName}
                  onChange={e =>
                    setFormState(fs => ({ ...fs, lastName: e.target.value }))
                  }
                />
              </div>
            </div>
            <div className='grid grid-cols-1 sm:grid-cols-3 gap-3 space-y-2 sm:space-y-0'>
              <div className='space-y-2'>
                <Label htmlFor='edit-appointingOfficial'>
                  Appointing Official
                </Label>
                <Input
                  id='edit-appointingOfficial'
                  value={formState.appointingOfficial}
                  onChange={e =>
                    setFormState(fs => ({
                      ...fs,
                      appointingOfficial: e.target.value
                    }))
                  }
                />
              </div>
              <div className='space-y-2'>
                <Label htmlFor='edit-appointingOfficialTitle'>Title</Label>
                <Input
                  id='edit-appointingOfficialTitle'
                  value={formState.appointingOfficialTitle}
                  onChange={e =>
                    setFormState(fs => ({
                      ...fs,
                      appointingOfficialTitle: e.target.value
                    }))
                  }
                />
              </div>
              <div className='space-y-2'>
                <Label htmlFor='edit-appointmentDate'>Appointment Date</Label>
                <Input
                  id='edit-appointmentDate'
                  value={formState.appointmentDate}
                  onChange={e =>
                    setFormState(fs => ({
                      ...fs,
                      appointmentDate: e.target.value
                    }))
                  }
                />
              </div>
              <div className='space-y-2'>
                <Label htmlFor='edit-email'>Email</Label>
                <Input
                  id='edit-email'
                  value={formState.email}
                  onChange={e =>
                    setFormState(fs => ({ ...fs, email: e.target.value }))
                  }
                />
              </div>
              <div className='space-y-2'>
                <Label htmlFor='edit-businessPhone'>Business Phone</Label>
                <Input
                  id='edit-businessPhone'
                  value={formState.businessPhone}
                  onChange={e =>
                    setFormState(fs => ({
                      ...fs,
                      businessPhone: e.target.value
                    }))
                  }
                />
              </div>
              <div className='space-y-2'>
                <Label htmlFor='edit-cellPhone'>Cell Phone</Label>
                <Input
                  id='edit-cellPhone'
                  value={formState.cellPhone}
                  onChange={e =>
                    setFormState(fs => ({ ...fs, cellPhone: e.target.value }))
                  }
                />
              </div>
              <div className='space-y-2'>
                <Label htmlFor='edit-address'>Address</Label>
                <Input
                  id='edit-address'
                  value={formState.address}
                  onChange={e =>
                    setFormState(fs => ({ ...fs, address: e.target.value }))
                  }
                />
              </div>
              <div className='space-y-2'>
                <Label htmlFor='edit-city'>City</Label>
                <Input
                  id='edit-city'
                  value={formState.city}
                  onChange={e =>
                    setFormState(fs => ({ ...fs, city: e.target.value }))
                  }
                />
              </div>
              <div className='space-y-2'>
                <Label htmlFor='edit-zipCode'>Zip Code</Label>
                <Input
                  id='edit-zipCode'
                  value={formState.zipCode}
                  onChange={e =>
                    setFormState(fs => ({ ...fs, zipCode: e.target.value }))
                  }
                />
              </div>
            </div>
            <div className='grid grid-cols-1'>
              <div className='space-y-2'>
                <Label htmlFor='edit-photoUrl'>Photo URL</Label>
                <Input
                  id='edit-photoUrl'
                  value={formState.photoUrl}
                  onChange={e =>
                    setFormState(fs => ({ ...fs, photoUrl: e.target.value }))
                  }
                />
              </div>
              <div className='space-y-2 mt-2'>
                <Label htmlFor='edit-notes'>Notes</Label>
                <Textarea
                  id='edit-notes'
                  value={formState.notes}
                  onChange={e =>
                    setFormState(fs => ({ ...fs, notes: e.target.value }))
                  }
                />
              </div>
            </div>
            <DialogFooter className='mt-2'>
              <Button
                className='w-32 h-8'
                type='submit'
                disabled={isSubmitting}
              >
                {isSubmitting ? <Spinner /> : 'Save Changes'}
              </Button>
            </DialogFooter>
          </form>
        </div>
      </DialogContent>
    </Dialog>
  );
}
