'use client';

import { useState, useEffect } from 'react';
import { Calendar, DollarSign, MapPin, Building2, Briefcase, User, TrendingUp } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/shared/Card';
import Button from '@/components/shared/Button';
import Input from '@/components/shared/Input';
import Label from '@/components/shared/Label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/shared/Select';
import { ICreateSalaryEntry, IUpdateSalaryEntry, ISalaryEntry } from '@/types/ISalary';
import { constantsService } from '@/services/constants';

interface SalaryEntryFormProps {
  initialData?: ISalaryEntry;
  onSubmit: (data: ICreateSalaryEntry | IUpdateSalaryEntry) => void;
  isLoading?: boolean;
  submitText?: string;
}

export default function SalaryEntryForm({
  initialData,
  onSubmit,
  isLoading = false,
  submitText = 'Save Entry'
}: SalaryEntryFormProps) {
  const [formData, setFormData] = useState({
    level: initialData?.level || '',
    position: initialData?.position || '',
    tech_stack: initialData?.tech_stack || [],
    experience: initialData?.experience || '',
    gender: initialData?.gender || '',
    company: initialData?.company || '',
    company_size: initialData?.company_size || '',
    work_type: initialData?.work_type || '',
    city: initialData?.city || '',
    currency: initialData?.currency || 'TRY',
    salary_min: initialData?.salary_min || 0,
    salary_max: initialData?.salary_max || undefined,
    raise_period: initialData?.raise_period || 3,
    start_time: initialData?.start_time ? new Date(initialData.start_time).toISOString().split('T')[0] : '',
    end_time: initialData?.end_time ? new Date(initialData.end_time).toISOString().split('T')[0] : '',
  });

  const [constants, setConstants] = useState({
    positions: [] as string[],
    levels: [] as string[],
    techStacks: [] as string[],
    experiences: [] as string[],
    companies: [] as string[],
    companySizes: [] as string[],
    workTypes: [] as string[],
    cities: [] as string[],
    currencies: [] as string[],
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    loadConstants();
  }, []);

  const loadConstants = async () => {
    try {
      const [positionsError, positions] = await constantsService.getPositions();
      const [levelsError, levels] = await constantsService.getLevels();
      const [techStacksError, techStacks] = await constantsService.getTechStacks();
      const [experiencesError, experiences] = await constantsService.getExperiences();
      const [companiesError, companies] = await constantsService.getCompanies();
      const [companySizesError, companySizes] = await constantsService.getCompanySizes();
      const [workTypesError, workTypes] = await constantsService.getWorkTypes();
      const [citiesError, cities] = await constantsService.getCities();
      const [currenciesError, currencies] = await constantsService.getCurrencies();

      if (!positionsError && positions) setConstants(prev => ({ ...prev, positions }));
      if (!levelsError && levels) setConstants(prev => ({ ...prev, levels }));
      if (!techStacksError && techStacks) setConstants(prev => ({ ...prev, techStacks }));
      if (!experiencesError && experiences) setConstants(prev => ({ ...prev, experiences }));
      if (!companiesError && companies) setConstants(prev => ({ ...prev, companies }));
      if (!companySizesError && companySizes) setConstants(prev => ({ ...prev, companySizes }));
      if (!workTypesError && workTypes) setConstants(prev => ({ ...prev, workTypes }));
      if (!citiesError && cities) setConstants(prev => ({ ...prev, cities }));
      if (!currenciesError && currencies) setConstants(prev => ({ ...prev, currencies }));
    } catch (error) {
      console.error('Failed to load constants:', error);
    }
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.level) newErrors.level = 'Level is required';
    if (!formData.position) newErrors.position = 'Position is required';
    if (!formData.tech_stack || formData.tech_stack.length === 0) newErrors.tech_stack = 'At least one technology is required';
    if (!formData.experience) newErrors.experience = 'Experience is required';
    if (!formData.gender) newErrors.gender = 'Gender is required';
    if (!formData.company) newErrors.company = 'Company is required';
    if (!formData.company_size) newErrors.company_size = 'Company size is required';
    if (!formData.work_type) newErrors.work_type = 'Work type is required';
    if (!formData.city) newErrors.city = 'City is required';
    if (!formData.currency) newErrors.currency = 'Currency is required';

    if (!formData.raise_period || formData.raise_period < 1) newErrors.raise_period = 'Raise period is required';
    if (!formData.salary_min || formData.salary_min <= 0) newErrors.salary_min = 'Minimum salary must be greater than 0';
    if (!formData.start_time) newErrors.start_time = 'Start time is required';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }
    const submitData = {
      ...formData,
      salary_range: formData.salary_max ? `${formData.salary_min} - ${formData.salary_max}` : `${formData.salary_min}+`,
      start_time: new Date(formData.start_time).toISOString(),
      end_time: formData.end_time ? new Date(formData.end_time).toISOString() : undefined,
    };

    onSubmit(submitData);
  };

  const handleInputChange = (field: string, value: string | number | string[] | undefined) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  return (
    <Card>
      <CardHeader className="border-b border-slate-200">
        <CardTitle className="text-slate-900">
          {initialData ? 'Edit Salary Entry' : 'Create New Salary Entry'}
        </CardTitle>
      </CardHeader>

      <CardContent className="px-6">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label className="flex items-center space-x-2 text-sm font-medium text-slate-700">
                <User className="h-4 w-4 text-violet-600" />
                <span>Level *</span>
              </Label>
              <Select
                value={formData.level}
                onValueChange={(value) => handleInputChange('level', value)}
              >
                <SelectTrigger className={errors.level ? "border-red-300" : ""}>
                  <SelectValue placeholder="Select Level" />
                </SelectTrigger>
                <SelectContent>
                  {constants.levels.map((level) => (
                    <SelectItem key={level} value={level}>
                      {level}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {errors.level && <p className="text-red-500 text-sm">{errors.level}</p>}
            </div>

            <div className="space-y-2">
              <Label className="flex items-center space-x-2 text-sm font-medium text-slate-700">
                <Briefcase className="h-4 w-4 text-violet-600" />
                <span>Position *</span>
              </Label>
              <Select
                value={formData.position}
                onValueChange={(value) => handleInputChange('position', value)}
              >
                <SelectTrigger className={errors.position ? "border-red-300" : ""}>
                  <SelectValue placeholder="Select Position" />
                </SelectTrigger>
                <SelectContent>
                  {constants.positions.map((position) => (
                    <SelectItem key={position} value={position}>
                      {position}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {errors.position && <p className="text-red-500 text-sm">{errors.position}</p>}
            </div>

            <div className="space-y-2 md:col-span-2">
              <Label className="flex items-center space-x-2 text-sm font-medium text-slate-700">
                <TrendingUp className="h-4 w-4 text-violet-600" />
                <span>Tech Stack *</span>
              </Label>
              <div className="space-y-2">
                <div className={`flex flex-wrap gap-2 min-h-[2.5rem] p-2 border rounded-md ${errors.tech_stack ? 'border-red-300' : 'border-slate-300'}`}>
                  {formData.tech_stack.length === 0 ? (
                    <span className="text-slate-500 text-sm">Select technologies...</span>
                  ) : (
                    formData.tech_stack.map((tech) => (
                      <span
                        key={tech}
                        className="inline-flex items-center px-2 py-1 text-xs bg-violet-100 text-violet-800 rounded-md"
                      >
                        {tech}
                        <button
                          type="button"
                          onClick={() => {
                            const newTechStack = formData.tech_stack.filter(t => t !== tech);
                            handleInputChange('tech_stack', newTechStack);
                          }}
                          className="ml-1 text-violet-600 hover:text-violet-800"
                        >
                          ×
                        </button>
                      </span>
                    ))
                  )}
                </div>
                <Select
                  onValueChange={(value) => {
                    if (!formData.tech_stack.includes(value)) {
                      handleInputChange('tech_stack', [...formData.tech_stack, value]);
                    }
                  }}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Add Technology" />
                  </SelectTrigger>
                  <SelectContent>
                    {constants.techStacks
                      .filter(tech => !formData.tech_stack.includes(tech))
                      .map((tech) => (
                        <SelectItem key={tech} value={tech}>
                          {tech}
                        </SelectItem>
                      ))
                    }
                  </SelectContent>
                </Select>
              </div>
              {errors.techStack && <p className="text-red-500 text-sm">{errors.techStack}</p>}
            </div>

            <div className="space-y-2">
              <Label className="flex items-center space-x-2 text-sm font-medium text-slate-700">
                <TrendingUp className="h-4 w-4 text-violet-600" />
                <span>Experience *</span>
              </Label>
              <Select
                value={formData.experience}
                onValueChange={(value) => handleInputChange('experience', value)}
              >
                <SelectTrigger className={errors.experience ? "border-red-300" : ""}>
                  <SelectValue placeholder="Select Experience" />
                </SelectTrigger>
                <SelectContent>
                  {constants.experiences.map((experience) => (
                    <SelectItem key={experience} value={experience}>
                      {experience}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {errors.experience && <p className="text-red-500 text-sm">{errors.experience}</p>}
            </div>

            <div className="space-y-2">
              <Label className="flex items-center space-x-2 text-sm font-medium text-slate-700">
                <Building2 className="h-4 w-4 text-violet-600" />
                <span>Company *</span>
              </Label>
              <Select
                value={formData.company}
                onValueChange={(value) => handleInputChange('company', value)}
              >
                <SelectTrigger className={errors.company ? "border-red-300" : ""}>
                  <SelectValue placeholder="Select Company" />
                </SelectTrigger>
                <SelectContent>
                  {constants.companies.map((company) => (
                    <SelectItem key={company} value={company}>
                      {company}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {errors.company && <p className="text-red-500 text-sm">{errors.company}</p>}
            </div>

            <div className="space-y-2">
              <Label className="flex items-center space-x-2 text-sm font-medium text-slate-700">
                <DollarSign className="h-4 w-4 text-violet-600" />
                <span>Currency *</span>
              </Label>
              <Select
                value={formData.currency}
                onValueChange={(value) => handleInputChange('currency', value)}
              >
                <SelectTrigger className={errors.currency ? "border-red-300" : ""}>
                  <SelectValue placeholder="Select Currency" />
                </SelectTrigger>
                <SelectContent>
                  {constants.currencies.map((currency) => (
                    <SelectItem key={currency} value={currency}>
                      {currency}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {errors.currency && <p className="text-red-500 text-sm">{errors.currency}</p>}
            </div>

            <div className="space-y-2">
              <Label className="flex items-center space-x-2 text-sm font-medium text-slate-700">
                <User className="h-4 w-4 text-violet-600" />
                <span>Gender</span>
              </Label>
              <Select
                value={formData.gender}
                onValueChange={(value) => handleInputChange('gender', value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select Gender" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Male">Male</SelectItem>
                  <SelectItem value="Female">Female</SelectItem>
                  <SelectItem value="Other">Other</SelectItem>
                  <SelectItem value="Prefer not to say">Prefer not to say</SelectItem>
                </SelectContent>
              </Select>
              {errors.gender && <p className="text-red-500 text-sm">{errors.gender}</p>}
            </div>

            <div className="space-y-2">
              <Label className="flex items-center space-x-2 text-sm font-medium text-slate-700">
                <Building2 className="h-4 w-4 text-violet-600" />
                <span>Company Size *</span>
              </Label>
              <Select
                value={formData.company_size}
                onValueChange={(value) => handleInputChange('company_size', value)}
              >
                <SelectTrigger className={errors.company_size ? "border-red-300" : ""}>
                  <SelectValue placeholder="Select Company Size" />
                </SelectTrigger>
                <SelectContent>
                  {constants.companySizes.map((size) => (
                    <SelectItem key={size} value={size}>
                      {size}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {errors.companySize && <p className="text-red-500 text-sm">{errors.companySize}</p>}
            </div>

            <div className="space-y-2">
              <Label className="flex items-center space-x-2 text-sm font-medium text-slate-700">
                <Briefcase className="h-4 w-4 text-violet-600" />
                <span>Work Type *</span>
              </Label>
              <Select
                value={formData.work_type}
                onValueChange={(value) => handleInputChange('work_type', value)}
              >
                <SelectTrigger className={errors.work_type ? "border-red-300" : ""}>
                  <SelectValue placeholder="Select Work Type" />
                </SelectTrigger>
                <SelectContent>
                  {constants.workTypes.map((type) => (
                    <SelectItem key={type} value={type}>
                      {type}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {errors.workType && <p className="text-red-500 text-sm">{errors.workType}</p>}
            </div>

            <div className="space-y-2">
              <Label className="flex items-center space-x-2 text-sm font-medium text-slate-700">
                <MapPin className="h-4 w-4 text-violet-600" />
                <span>City *</span>
              </Label>
              <Select
                value={formData.city}
                onValueChange={(value) => handleInputChange('city', value)}
              >
                <SelectTrigger className={errors.city ? "border-red-300" : ""}>
                  <SelectValue placeholder="Select City" />
                </SelectTrigger>
                <SelectContent>
                  {constants.cities.map((city) => (
                    <SelectItem key={city} value={city}>
                      {city}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {errors.city && <p className="text-red-500 text-sm">{errors.city}</p>}
            </div>

            <div className="space-y-2">
              <Label className="flex items-center space-x-2 text-sm font-medium text-slate-700">
                <DollarSign className="h-4 w-4 text-violet-600" />
                <span>Minimum Salary *</span>
              </Label>
              <Input
                type="number"
                min="0"
                step="1"
                value={formData.salary_min || ''}
                onChange={(e) => handleInputChange('salary_min', parseInt(e.target.value) || 0)}
                placeholder="e.g., 75000"
                className={errors.salary_min ? "border-red-300" : ""}
              />
              {errors.salary_min && <p className="text-red-500 text-sm">{errors.salary_min}</p>}
            </div>

            <div className="space-y-2">
              <Label className="flex items-center space-x-2 text-sm font-medium text-slate-700">
                <DollarSign className="h-4 w-4 text-violet-600" />
                <span>Maximum Salary</span>
              </Label>
              <Input
                type="number"
                min="0"
                step="1"
                value={formData.salary_max || ''}
                onChange={(e) => handleInputChange('salary_max', parseInt(e.target.value) || undefined)}
                placeholder="e.g., 95000"
              />
            </div>



            <div className="space-y-2">
              <Label className="flex items-center space-x-2 text-sm font-medium text-slate-700">
                <TrendingUp className="h-4 w-4 text-violet-600" />
                <span>Raise Period (months) *</span>
              </Label>
              <Select
                value={formData.raise_period.toString()}
                onValueChange={(value) => handleInputChange('raise_period', parseInt(value))}
              >
                <SelectTrigger className={errors.raise_period ? "border-red-300" : ""}>
                  <SelectValue placeholder="Select Raise Period" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1">Quarterly (every 3 months)</SelectItem>
                  <SelectItem value="2">Semi-Annual (every 6 months)</SelectItem>
                  <SelectItem value="3">Annual (every 12 months)</SelectItem>
                  <SelectItem value="4">Biennial (every 24 months)</SelectItem>
                </SelectContent>
              </Select>
              {errors.raise_period && <p className="text-red-500 text-sm">{errors.raise_period}</p>}
              <p className="text-xs text-slate-500">How often do you typically receive raises?</p>
            </div>

            <div className="space-y-2">
              <Label className="flex items-center space-x-2 text-sm font-medium text-slate-700">
                <Calendar className="h-4 w-4 text-violet-600" />
                <span>Start Date *</span>
              </Label>
              <Input
                type="date"
                value={formData.start_time}
                onChange={(e) => handleInputChange('start_time', e.target.value)}
                className={errors.start_time ? "border-red-300" : ""}
              />
              {errors.start_time && <p className="text-red-500 text-sm">{errors.start_time}</p>}
            </div>

            <div className="space-y-2">
              <Label className="flex items-center space-x-2 text-sm font-medium text-slate-700">
                <Calendar className="h-4 w-4 text-violet-600" />
                <span>End Date (Optional)</span>
              </Label>
              <Input
                type="date"
                value={formData.end_time}
                onChange={(e) => handleInputChange('end_time', e.target.value)}
              />
            </div>
          </div>

          <div className="flex justify-end pt-4">
            <Button
              type="submit"
              disabled={isLoading}
              className="bg-violet-600 hover:bg-violet-700 text-white px-8"
            >
              {isLoading ? 'Saving...' : submitText}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}